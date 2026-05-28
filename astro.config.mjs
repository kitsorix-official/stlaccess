// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// A tiny integration to collapse Astro's sitemap-index.xml and sitemap-0.xml into a single sitemap.xml
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
        // Copy sitemap-0.xml to sitemap.xml
        fs.copyFileSync(sitemap0Path, targetSitemapPath);
        console.log(`[single-sitemap] Successfully created single sitemap at: ${targetSitemapPath}`);

        // Delete temporary/index files
        fs.unlinkSync(sitemap0Path);
        if (fs.existsSync(sitemapIndexPath)) {
          fs.unlinkSync(sitemapIndexPath);
        }
        console.log(`[single-sitemap] Cleaned up multi-file sitemap artifacts.`);
      } catch (err) {
        console.error('[single-sitemap] Error processing sitemap collapsing:', err);
      }
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
        return item;
      }
    }),
    singleSitemap()
  ],

  vite: {
    plugins: [tailwindcss()]
  },

  adapter: cloudflare()
});