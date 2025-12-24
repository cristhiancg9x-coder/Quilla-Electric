// astro.config.mjs
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel'; // <--- ESTA ES LA IMPORTACIÓN CORRECTA (Solo una vez)

export default defineConfig({
  // Tu dominio real
  site: 'https://quillaelectric.site',

  // Modo servidor para que funcione el cotizador dinámico
  output: 'server',

  integrations: [
    sitemap(), 
    react(), 
    tailwind() 
  ],

  // Configuración del adaptador
  adapter: vercel({
    webAnalytics: { enabled: true },
    imageService: true, // Opcional: ayuda a Vercel a detectar mejor la app
  })
});