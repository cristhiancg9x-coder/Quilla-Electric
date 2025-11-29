// src/content/config.mjs
import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    image: image().optional(),
    author: z.string().default('Quilla Electric'),
    tags: z.array(z.string()).default(['Electricidad']),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  'blog': blogCollection,
};