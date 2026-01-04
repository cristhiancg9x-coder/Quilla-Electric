// astro.config.mjs
/**
 * @file Configuración principal de Astro
 * @description Define la configuración del sitio, integraciones y opciones de build.
 * @see https://docs.astro.build/en/reference/configuration-reference/
 */
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap'; // <--- Asegúrate de que esto esté aquí

export default defineConfig({
  /**
   * URL base del sitio web.
   * IMPORTANTE: Debe ser la URL de producción final (con https).
   * Se utiliza para generar sitemaps y URLs canónicas correctas.
   */
  site: 'https://quillaelectric.site', 
  
  /**
   * Lista de integraciones activas.
   * - sitemap(): Genera automáticamente el sitemap.xml al construir el sitio.
   */
  integrations: [sitemap()],
});