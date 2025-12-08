import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  // 1. Cargamos todos los artículos del blog
  const blog = await getCollection('blog');

  // 2. Ordenamos los posts para que salgan los nuevos primero
  // (Esto también ayuda a filtrar errores)
  const postsOrdenados = blog.sort((a, b) => {
    const fechaA = a.data.pubDate ? new Date(a.data.pubDate).valueOf() : 0;
    const fechaB = b.data.pubDate ? new Date(b.data.pubDate).valueOf() : 0;
    return fechaB - fechaA;
  });

  return rss({
    // Título que leerá Google o Metricool
    title: 'Blog de Quilla Electric Arequipa',
    description: 'Consejos de seguridad eléctrica, normativa y ahorro de energía.',
    site: context.site, // IMPORTANTE: Esto jala el 'site' de tu astro.config.mjs
    
    // Mapeamos los artículos al formato RSS
    items: postsOrdenados.map((post) => ({
      title: post.data.title,
      
      // --- PROTECCIÓN DE FECHA ---
      // Si existe fecha, la usa. Si no, usa la fecha actual (new Date())
      pubDate: post.data.pubDate ? post.data.pubDate : new Date(),
      
      description: post.data.description,
      // En Astro v5 usamos .id para el enlace
      link: `/blog/${post.id}/`,
    })),
    
    // Configuración regional
    customData: `<language>es-pe</language>`,
  });
}