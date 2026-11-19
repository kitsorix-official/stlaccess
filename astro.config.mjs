// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import pwa from './scripts/pwa-integration.mjs';
import cspHeaders from './scripts/csp-integration.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Freshness: sitemap <lastmod> reflects real content dates, not the build date.
// Rebuilding/deploying is not a content edit. Guides use their frontmatter
// modDate/pubDate; other pages use the explicit content-review date in
// site.json, which is also the date shown visitors in the page footer.
const siteConfig = JSON.parse(
  fs.readFileSync(new URL("./src/data/site.json", import.meta.url), "utf8"),
);
const reviewLastmod = siteConfig.lastContentReview
  ? new Date(siteConfig.lastContentReview).toISOString()
  : null;

function frontmatterDate(file) {
  try {
    const text = fs.readFileSync(file, "utf8");
    const match =
      text.match(/^modDate:\s*"?([^"\n]+)"?\s*$/m) ||
      text.match(/^pubDate:\s*"?([^"\n]+)"?\s*$/m);
    if (!match) return null;
    const date = new Date(match[1].trim());
    return Number.isNaN(date.valueOf()) ? null : date.toISOString();
  } catch {
    return null;
  }
}

function lastmodForUrl(url) {
  const rel = new URL(url).pathname.replace(/^\/+|\/+$/g, "");
  const segments = rel ? rel.split("/") : [];
  const pageRoot = path.join(process.cwd(), "src/pages");
  const candidates = [];

  if (segments[0] === "guides" && segments[1]) {
    candidates.push(
      path.join(process.cwd(), "src/content/guides", `${segments[1]}.md`),
    );
  }
  candidates.push(path.join(pageRoot, rel, "index.astro"));
  candidates.push(path.join(pageRoot, `${rel}.astro`));
  candidates.push(path.join(pageRoot, `${rel}.md`));
  if (segments.length > 1) {
    candidates.push(
      path.join(pageRoot, ...segments.slice(0, -1), "[slug].astro"),
    );
  }

  for (const file of candidates) {
    if (!fs.existsSync(file)) continue;
    const contentDate = file.endsWith(".md") ? frontmatterDate(file) : null;
    if (contentDate) return contentDate;
  }
  return reviewLastmod ?? new Date(0).toISOString();
}

// A tiny integration to collapse Astro's sitemap-index.xml and sitemap-0.xml into a single sitemap.xml
// and strip the <meta name="generator"> tag from all HTML output
const singleSitemap = () => ({
  name: 'single-sitemap',
  hooks: {
    'astro:build:done': async ({ dir }) => {
      const dirPath = fileURLToPath(dir);
      const possibleClientDirs = [
        path.join(dirPath, 'client'),
        dirPath
      ];

      let clientDir = '';
      for (const d of possibleClientDirs) {
        if (fs.existsSync(path.join(d, 'sitemap-0.xml'))) {
          clientDir = d;
          break;
        }
      }

      if (!clientDir) {
        console.warn('single-sitemap: Could not find sitemap-0.xml in build output paths.');
        return;
      }

      const sitemap0Path = path.join(clientDir, 'sitemap-0.xml');
      const sitemapIndexPath = path.join(clientDir, 'sitemap-index.xml');
      const targetSitemapPath = path.join(clientDir, 'sitemap.xml');

      try {
        fs.copyFileSync(sitemap0Path, targetSitemapPath);
        console.log(`[single-sitemap] Successfully created single sitemap at: ${targetSitemapPath}`);

        fs.unlinkSync(sitemap0Path);
        if (fs.existsSync(sitemapIndexPath)) {
          fs.unlinkSync(sitemapIndexPath);
        }
        console.log(`[single-sitemap] Cleaned up multi-file sitemap artifacts.`);
      } catch (err) {
        console.error('[single-sitemap] Error processing sitemap collapsing:', err);
      }

      // Strip <meta name="generator"> from all HTML files
      const stripGenerator = (dir) => {
        for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
          const fullPath = path.join(dir, entry.name);
          if (entry.isDirectory()) {
            stripGenerator(fullPath);
          } else if (entry.name.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            const cleaned = content.replace(/<meta\s+name="generator"[^>]*>/g, '');
            if (content !== cleaned) {
              fs.writeFileSync(fullPath, cleaned);
            }
          }
        }
      };
      stripGenerator(clientDir);
      console.log(`[single-sitemap] Stripped <meta name="generator"> from HTML files.`);
    }
  }
});

// https://astro.build/config
export default defineConfig({
  site: 'https://stlaccess.com/',
  trailingSlash: 'never',

  build: {
    format: 'file'
  },

  integrations: [
    sitemap({
      serialize(item) {
        if (item.url !== 'https://stlaccess.com/' && item.url.endsWith('/')) {
          item.url = item.url.slice(0, -1);
        }
        item.lastmod = lastmodForUrl(item.url);
        return item;
      }
    }),
    singleSitemap(),
    react(),
    pwa(),
    cspHeaders()
  ],

  vite: {
    plugins: [
      tailwindcss(),
      {
        name: 'strip-generator-meta',
        transformIndexHtml(html) {
          return html.replace(/<meta\s+name="generator"[^>]*>/g, '');
        }
      }
    ]
  }
});