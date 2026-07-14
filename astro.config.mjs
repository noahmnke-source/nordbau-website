// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// WICHTIG: `site` vor Launch auf die echte Domain ändern (siehe src/config/site.ts).
export default defineConfig({
  site: 'https://www.nord-bau.de',
  trailingSlash: 'always',
  integrations: [sitemap()],
  image: {
    domains: ['images.unsplash.com'],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
