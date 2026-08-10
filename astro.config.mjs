// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import pwa from './scripts/pwa-integration.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

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
        item.lastmod = new Date().toISOString();
        return item;
      }
    }),
    singleSitemap(),
    pwa()
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