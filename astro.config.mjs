// astro.config.mjs
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://quillaelectric.site',
  output: 'server', // SSR activado para tu cotizador y admin

  // UNA SOLA definición del adaptador con todas las opciones
  adapter: vercel({
    webAnalytics: { enabled: true },
    imageService: true, // Utiliza el servicio de optimización de imágenes de Vercel
    isr: {
      // Incremental Static Regeneration (Opcional: cachea páginas estáticas para velocidad)
      expiration: 60 * 60 * 24, // 24 horas
    }
  }),

  integrations: [
    sitemap(),
    react(),
    tailwind({
      // Asegura que tailwind procese estilos anidados si los usas
      applyBaseStyles: false, 
    })
  ],

  vite: {
    build: {
      // Ayuda a evitar conflictos con chunks muy grandes
      chunkSizeWarningLimit: 1000,
    }
  }
});