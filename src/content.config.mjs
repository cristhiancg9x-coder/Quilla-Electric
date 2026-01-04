// src/content.config.mjs
/**
 * @file Configuración de Colecciones de Contenido (Content Collections)
 * @description Define los esquemas de datos y validaciones para Blog y Servicios.
 * @see https://docs.astro.build/en/guides/content-collections/
 */
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders'; // Importante para Astro v5

// 1. Colección del BLOG
/**
 * Colección de contenido para el Blog.
 * @type {import('astro:content').CollectionConfig}
 * @property {import('astro/loaders').Loader} loader - Carga archivos Markdown glob pattern.
 * @property {import('astro:content').Schema} schema - Esquema de validación con Zod.
 */
const blog = defineCollection({
  // En Astro v5 usamos el "loader" para buscar archivos
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  
  /**
   * Esquema de validación para los posts del blog.
   * @param {object} context - Contexto de validación de Astro.
   * @param {function} context.image - Helper para validar imágenes.
   * @returns {import('zod').ZodObject} Esquema Zod.
   */
  schema: ({ image }) => z.object({
    title: z.string().describe("Título del artículo"),
    description: z.string().describe("Breve resumen para SEO y listados"),
    // Fecha segura: si falla, usa la fecha actual
    pubDate: z.coerce.date().optional().describe("Fecha de publicación"), 
    image: image().optional().describe("Imagen destacada del artículo"),
    author: z.string().default('Quilla Electric').describe("Autor del post"),
    tags: z.array(z.string()).default(['Electricidad']).describe("Etiquetas para categorizar"),
  }),
});

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
  blog,
  servicios,
};