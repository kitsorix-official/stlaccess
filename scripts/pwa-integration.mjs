// @ts-check
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('..', import.meta.url));

function collectFiles(dirPath, baseDir, list) {
  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      collectFiles(fullPath, baseDir, list);
    } else {
      list.push('/' + path.relative(baseDir, fullPath).split(path.sep).join('/'));
    }
  }
  return list;
}

/**
 * Generates the PWA service worker and web manifest at build time.
 * Runs after the single-sitemap integration so dist/ is final.
 */
export default function pwa() {
  return {
    name: 'pwa',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        const distPath = fileURLToPath(dir);
        const site = JSON.parse(
          fs.readFileSync(path.join(projectRoot, 'src/data/site.json'), 'utf8'),
        );

        // --- Web manifest (written first so it ends up precached) ---
        const manifest = {
          name: site.name,
          short_name: site.name,
          description: site.description,
          id: '/',
          start_url: '/',
          scope: '/',
          display: 'standalone',
          lang: 'en',
          categories: ['utilities', 'hobbies'],
          background_color: site.backgroundColor,
          theme_color: site.themeColor,
          icons: [
            { src: '/pwa-192x192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
            { src: '/pwa-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
            { src: '/pwa-maskable-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
          ],
          shortcuts: [
            { name: 'Scale Engine', short_name: 'Scaler', url: '/', icons: [{ src: '/pwa-192x192.png', sizes: '192x192', type: 'image/png' }] },
            { name: 'Tools', url: '/tools', icons: [{ src: '/pwa-192x192.png', sizes: '192x192', type: 'image/png' }] },
            { name: 'Reference', url: '/reference', icons: [{ src: '/pwa-192x192.png', sizes: '192x192', type: 'image/png' }] },
          ],
        };
        const manifestPath = path.join(distPath, 'manifest.webmanifest');
        fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
        console.log('[pwa] Wrote manifest.webmanifest');

        // --- Precache list (everything in dist except the SW and redirects) ---
        const precacheUrls = collectFiles(distPath, distPath, [])
          .filter((f) => f !== '/sw.js' && f !== '/_redirects')
          .sort();

        // --- Navigation map: pretty URL -> cached file ---
        const navMap = {};
        for (const f of precacheUrls) {
          if (!f.endsWith('.html')) continue;
          if (f === '/index.html') {
            navMap['/'] = f;
            continue;
          }
          const pretty = f.slice(0, -5);
          navMap[pretty] = f;
          navMap[pretty + '/'] = f;
        }

        // --- Cross-origin assets precached at install so the site stays ---
        // --- fully styled offline (Font Awesome CSS + webfonts the site ---
        // --- actually uses). cdnjs serves these with CORS enabled, so ---
        // --- cache.add() works from the service worker. ---
        const externalPrecache = [
          'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
          'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/webfonts/fa-solid-900.woff2',
          'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/webfonts/fa-brands-400.woff2',
        ];

        // --- Version = hash of the manifest contents, so ANY content change ---
        // --- produces new sw.js bytes and triggers the update prompt. ---
        const hash = crypto.createHash('sha256');
        for (const f of precacheUrls) {
          const fileHash = crypto
            .createHash('sha256')
            .update(fs.readFileSync(path.join(distPath, f)))
            .digest('hex');
          hash.update(f);
          hash.update(fileHash);
        }
        hash.update(JSON.stringify(navMap));
        hash.update(JSON.stringify(externalPrecache));
        const version = hash.digest('hex').slice(0, 12);

        const precacheList = precacheUrls.concat(externalPrecache);

        // --- Render the service worker ---
        const template = fs.readFileSync(
          path.join(projectRoot, 'scripts/sw.js.template'),
          'utf8',
        );
        const sw = template
          .replaceAll('__SW_VERSION__', version)
          .replaceAll('__MANIFEST__', JSON.stringify(precacheList))
          .replaceAll('__NAV_MAP__', JSON.stringify(navMap));
        fs.writeFileSync(path.join(distPath, 'sw.js'), sw);

        console.log(
          `[pwa] Wrote sw.js (v${version}, ${precacheList.length} precached files)`,
        );
      },
    },
  };
}
