// astro.config.mjs
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap'; // <--- Asegúrate de que esto esté aquí

export default defineConfig({
  // Tienes que poner tu dominio EXACTO (con https)
  site: 'https://quillaelectric.site', 
  
  // Aquí activamos el plugin del mapa
  integrations: [sitemap()],
});