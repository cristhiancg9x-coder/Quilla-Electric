import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET() { // Quitamos 'context' para no depender de él
  // 1. Cargamos los artículos
  const blog = await getCollection('blog');

  // 2. Ordenamos por fecha
  const postsOrdenados = blog.sort((a, b) => {
    const fechaA = a.data.pubDate ? new Date(a.data.pubDate).valueOf() : 0;
    const fechaB = b.data.pubDate ? new Date(b.data.pubDate).valueOf() : 0;
    return fechaB - fechaA;
  });

  return rss({
    // Título
    title: 'Blog de Quilla Electric Arequipa',
    description: 'Consejos de seguridad eléctrica y normativa en Perú.',
    
    // AQUÍ ESTABA EL ERROR: Lo escribimos directo para que no falle nunca
    site: 'https://quillaelectric.site',
    
    // Items
    items: postsOrdenados.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate ? post.data.pubDate : new Date(),
      description: post.data.description,
      link: `/blog/${post.id}/`,
    })),
    
    customData: `<language>es-pe</language>`,
  });
}