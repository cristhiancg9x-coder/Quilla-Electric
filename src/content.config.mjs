// src/content.config.mjs
/**
 * @file Configuración de Colecciones de Contenido (Content Collections)
 * @description Define los esquemas de datos y validaciones para Blog y Servicios.
 * @see https://docs.astro.build/en/guides/content-collections/
 */
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders'; // Importante para Astro v5



// 2. Colección de SERVICIOS
/**
 * Colección de contenido para Servicios.
 * @type {import('astro:content').CollectionConfig}
 */
const servicios = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/servicios" }),
  
  /**
   * Esquema de validación para servicios ofrecidos.
   */
  schema: ({ image }) => z.object({
    title: z.string().describe("Nombre del servicio"),
    description: z.string().describe("Descripción detallada del servicio"),
    price: z.string().optional().describe("Precio referencial o texto 'A cotizar'"),
    image: image().optional().describe("Imagen principal del servicio"),
    imageFit: z.enum(['cover', 'contain']).optional().default('cover').describe("Ajuste de la imagen en tarjetas (cover/contain)"),
  }),
});

// 3. Exportamos las colecciones
/**
 * Exportación de todas las colecciones registradas.
 * Astro buscará automáticamente este objeto exportado.
 */
export const collections = {
  servicios,
};