import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  // 1. Cargamos todos los artículos del blog
  const blog = await getCollection('blog');

  return rss({
    // Título que leerá Google o Metricool
    title: 'Blog de Quilla Electric Arequipa',
    description: 'Consejos de seguridad eléctrica, normativa y ahorro de energía.',
    site: context.site,
    
    // Mapeamos los artículos al formato RSS
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate, // Asegúrate que tus .md tengan fecha
      description: post.data.description,
      // En Astro v5 usamos .id para el enlace
      link: `/blog/${post.id}/`,
    })),
    
    // Configuración regional
    customData: `<language>es-pe</language>`,
  });
}