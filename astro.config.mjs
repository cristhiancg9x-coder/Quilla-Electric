// astro.config.mjs
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind'; // <--- 1. Usamos la integración oficial

import vercel from '@astrojs/vercel';

export default defineConfig({
  // Tienes que poner tu dominio EXACTO (con https)
  site: 'https://quillaelectric.site',

  output: 'server',

  // 2. Agregamos tailwind() aquí dentro
  // 3. Borramos la sección de vite que tenías antes
  integrations: [
    sitemap(), 
    react(), 
    tailwind() 
  ],

  adapter: vercel()
});