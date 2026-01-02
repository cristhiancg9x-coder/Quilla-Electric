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
      // Url de la imagen (si existe) para el feed
      const imgUrl = post.data.image ? `https://quillaelectric.site${post.data.image.src}` : null;
      
      return {
        title: post.data.title,
        pubDate: post.data.pubDate || new Date(),
        description: post.data.description,
        link: `/blog/${post.id}/`,
        content: `
          ${imgUrl ? `<img src="${imgUrl}" alt="${post.data.title}" style="max-width: 100%; border-radius: 8px;" />` : ''}
          <p>${post.data.description}</p>
          <br />
          <p>⚡ <strong>Lee el artículo completo y verificado aquí:</strong></p>
          <a href="https://quillaelectric.site/blog/${post.id}/">https://quillaelectric.site/blog/${post.id}/</a>
        `,
      };
    }),
    
    customData: `<language>es-pe</language>`,
  });
}