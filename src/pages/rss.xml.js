import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const blog = await getCollection('blog');

  // Ordenamos por fecha, los más nuevos primero
  const postsOrdenados = blog.sort((a, b) => {
    const fechaA = a.data.pubDate ? new Date(a.data.pubDate).valueOf() : 0;
    const fechaB = b.data.pubDate ? new Date(b.data.pubDate).valueOf() : 0;
    return fechaB - fechaA;
  });

  return rss({
    title: 'Blog de Quilla Electric Arequipa',
    description: 'Consejos de seguridad eléctrica, normativa y ahorro de energía.',
    site: 'https://quillaelectric.site',
    // Es importante mantener estos namespaces
    xmlns: {
      media: 'http://search.yahoo.com/mrss/',
      content: 'http://purl.org/rss/1.0/modules/content/',
      atom: 'http://www.w3.org/2005/Atom',
    },

    items: postsOrdenados.map((post) => {
      const link = `https://quillaelectric.site/blog/${post.id}/`;
      
      // --- AQUÍ ESTÁ LA SOLUCIÓN ---
      // Construimos el mensaje completo con HTML básico para que Metricool lo entienda.
      // Usamos <strong> para el título y <br/> para saltos de línea.
      const mensajeCompleto = `
<strong>${post.data.title}</strong><br/><br/>
⚡ Nuevo artículo en nuestro blog técnico.<br/>
Conoce más sobre seguridad eléctrica y normativas en Arequipa aquí:<br/><br/>
${post.data.description}<br/><br/>
👇👇 Lee la nota completa aquí:<br/>
${link}
      `.trim();
      // -----------------------------

      return {
        title: post.data.title,
        pubDate: post.data.pubDate ? post.data.pubDate : new Date(),
        description: post.data.description,
        link: link,
        // Le pasamos el mensaje ya listo en el campo 'content'
        content: mensajeCompleto,
      };
    }),
    
    customData: `<language>es-pe</language>`,
  });
}