// @ts-check
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

function collectHtml(dirPath, list = []) {
  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      collectHtml(fullPath, list);
    } else if (entry.name.endsWith('.html')) {
      list.push(fullPath);
    }
  }
  return list;
}

function cspHash(value) {
  return `'sha256-${crypto.createHash('sha256').update(value).digest('base64')}'`;
}

// Only executable script types are gated by script-src. Data blocks such as
// application/ld+json never run and do not need a hash (and including all 119
// JSON-LD blocks would blow Cloudflare's 2,000-character _headers line limit).
function isExecutableScript(type) {
  if (!type) return true;
  return /^(text\/javascript|application\/javascript|module|text\/ecmascript|application\/ecmascript)$/i.test(type);
}

/**
 * Replaces the CSP line in the generated Cloudflare Pages _headers file with
 * an allow-list of hashes for this build's first-party inline scripts/styles.
 * That removes 'unsafe-inline' without breaking the site's inline JSON-LD,
 * calculator bootstrap or small UI styles.
 */
export default function cspHeaders() {
  return {
    name: 'csp-headers',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        const dirPath = fileURLToPath(dir);
        const outputDir = fs.existsSync(path.join(dirPath, 'index.html'))
          ? dirPath
          : path.join(dirPath, 'client');
        const headersPath = path.join(outputDir, '_headers');

        if (!fs.existsSync(headersPath)) {
          console.warn('[csp] No _headers found in build output; skipped.');
          return;
        }

        const scriptHashes = new Set();
        const styleHashes = new Set();
        const attributeHashes = new Set();
        const handlerHashes = new Set();

        for (const file of collectHtml(outputDir)) {
          const html = fs.readFileSync(file, 'utf8');

          // Inline executable scripts only. JSON-LD data blocks are exempt.
          for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
            if (/\bsrc\s*=/.test(match[1])) continue;
            const type = (match[1].match(/\btype="([^"]*)"/i) || [])[1] || '';
            if (!isExecutableScript(type) || !match[2].trim()) continue;
            scriptHashes.add(cspHash(match[2]));
          }

          // Inline <style> blocks.
          for (const match of html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)) {
            styleHashes.add(cspHash(match[1]));
          }

          // Inline style attributes (markdown table alignment, 404 delays).
          for (const match of html.matchAll(/\sstyle="([^"]*)"/gi)) {
            attributeHashes.add(cspHash(match[1]));
          }

          // Defensive: if an inline event handler slips through, hash it rather
          // than silently weakening the policy to 'unsafe-inline'.
          for (const match of html.matchAll(/\son[a-z]+="([^"]*)"/gi)) {
            handlerHashes.add(cspHash(match[1]));
          }
        }

        const styleTokens = ['\'self\'', ...styleHashes];
        if (attributeHashes.size || handlerHashes.size) {
          styleTokens.push('\'unsafe-hashes\'', ...attributeHashes, ...handlerHashes);
        }
        const scriptTokens = ['\'self\'', ...scriptHashes];
        if (handlerHashes.size) {
          scriptTokens.push('\'unsafe-hashes\'', ...handlerHashes);
        }

        const csp = [
          'default-src \'self\'',
          `script-src ${scriptTokens.join(' ')}`,
          `style-src ${styleTokens.join(' ')}`,
          'img-src \'self\' data: blob:',
          'font-src \'self\'',
          'connect-src \'self\' https://script.google.com https://script.googleusercontent.com',
          'form-action \'self\' https://script.google.com',
          'frame-ancestors \'none\'',
          'base-uri \'self\'',
          'object-src \'none\'',
          'worker-src \'self\'',
          'manifest-src \'self\'',
          'upgrade-insecure-requests',
        ].join('; ');

        if (csp.length > 2000) {
          throw new Error(`[csp] Generated CSP is ${csp.length} characters; Cloudflare Pages allows 2000 per line.`);
        }

        const headers = fs.readFileSync(headersPath, 'utf8');
        const updated = headers.replace(
          /^(\s*Content-Security-Policy:\s*).+$/m,
          `$1${csp}`,
        );

        if (updated === headers) {
          console.warn('[csp] Content-Security-Policy line was not found; skipped.');
          return;
        }

        fs.writeFileSync(headersPath, updated);
        console.log(
          `[csp] Wrote strict CSP (${scriptHashes.size} script, ${styleHashes.size} style, ${attributeHashes.size} attribute hashes)`,
        );
      },
    },
  };
}
