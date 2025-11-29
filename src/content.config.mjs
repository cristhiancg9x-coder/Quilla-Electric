// src/content.config.mjs
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders'; // Importante para Astro v5

// 1. Colección del BLOG
const blog = defineCollection({
  // En Astro v5 usamos el "loader" para buscar archivos
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    // Fecha segura: si falla, usa la fecha actual
    pubDate: z.coerce.date().optional(), 
    image: image().optional(),
    author: z.string().default('Quilla Electric'),
    tags: z.array(z.string()).default(['Electricidad']),
  }),
});

// 2. Colección de SERVICIOS
const servicios = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/servicios" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    price: z.string().optional(),
    image: image().optional(),
  }),
});

// 3. Exportamos las colecciones
export const collections = {
  blog,
  servicios,
};