import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const blog = await getCollection('blog');

  // Ordenamos por fecha
  const postsOrdenados = blog.sort((a, b) => {
    const fechaA = a.data.pubDate ? new Date(a.data.pubDate).valueOf() : 0;
    const fechaB = b.data.pubDate ? new Date(b.data.pubDate).valueOf() : 0;
    return fechaB - fechaA;
  });

  return rss({
    title: 'Blog de Quilla Electric Arequipa',
    description: 'Consejos de seguridad eléctrica, normativa y ahorro de energía.',
    site: 'https://quillaelectric.site',
    
    // Agregamos namespaces para que sea más compatible
    xmlns: {
      media: 'http://search.yahoo.com/mrss/',
      atom: 'http://www.w3.org/2005/Atom',
    },

    items: postsOrdenados.map((post) => {
      // Intentamos construir la URL de la imagen si existe
      // Nota: Esto asume que tus imágenes están en src/assets y Astro las procesa.
      // Para RSS simple, a veces necesitamos la ruta pública.
      // Por ahora, pasaremos el link al artículo como guía.
      
      return {
        title: post.data.title,
        pubDate: post.data.pubDate ? post.data.pubDate : new Date(),
        description: post.data.description,
        link: `/blog/${post.id}/`,
        
        // TRUCO: Agregamos contenido extra para ayudar a Metricool
        content: `
          <p>${post.data.description}</p>
          <p>👇 Lee el artículo completo aquí:</p>
          <a href="https://quillaelectric.site/blog/${post.id}/">https://quillaelectric.site/blog/${post.id}/</a>
        `,
      };
    }),
    
    customData: `<language>es-pe</language>`,
  });
}