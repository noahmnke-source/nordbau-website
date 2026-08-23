// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// `site` muss mit SITE.url in src/config/site.ts und der Sitemap-URL in
// public/robots.txt übereinstimmen — bei einem Domainwechsel alle drei ändern.
export default defineConfig({
  site: 'https://ecobau-hannover.com',
  trailingSlash: 'always',
  integrations: [sitemap()],
  image: {
    domains: ['images.unsplash.com'],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
