// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://stlaccess.com/',
  trailingSlash: 'never',

  build: {
    format: 'file'
  },

  integrations: [sitemap({
    serialize(item) {
      if (item.url !== 'https://stlaccess.com/' && item.url.endsWith('/')) {
        item.url = item.url.slice(0, -1);
      }
      return item;
    }
  })],

  vite: {
    plugins: [tailwindcss()]
  },

  adapter: cloudflare()
});