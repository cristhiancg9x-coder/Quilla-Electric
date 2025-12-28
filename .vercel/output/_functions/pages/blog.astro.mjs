import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, f as addAttribute } from '../chunks/astro/server_DjG7uRHx.mjs';
import { $ as $$MainLayout } from '../chunks/MainLayout_CUJTzj17.mjs';
import { g as getCollection } from '../chunks/_astro_content_C3m_sXT3.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const posts = (await getCollection("blog")).sort((a, b) => {
    const fechaA = a.data.pubDate ? a.data.pubDate.valueOf() : 0;
    const fechaB = b.data.pubDate ? b.data.pubDate.valueOf() : 0;
    return fechaB - fechaA;
  });
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "titulo": "Blog de Electricidad", "descripcion": "Consejos y noticias sobre seguridad el\xE9ctrica en Per\xFA.", "data-astro-cid-5tznm7mj": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="relative py-12 md:py-20 px-4" data-astro-cid-5tznm7mj> <div class="absolute top-0 right-1/2 translate-x-1/2 w-[600px] h-[400px] bg-purple-900/20 blur-[120px] rounded-full -z-10 pointer-events-none" data-astro-cid-5tznm7mj></div> <div class="blog-header text-center mb-16 animate-fade-in-down" data-astro-cid-5tznm7mj> <span class="inline-block py-1 px-3 rounded-full bg-purple-500/10 border border-purple-400/20 text-purple-300 text-xs font-bold tracking-wider mb-4 uppercase" data-astro-cid-5tznm7mj>
Novedades & Consejos
</span> <h1 class="text-4xl md:text-5xl font-extrabold mb-4 text-white" data-astro-cid-5tznm7mj>
Blog <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400" data-astro-cid-5tznm7mj>Eléctrico</span> </h1> <p class="text-slate-400 text-lg max-w-2xl mx-auto" data-astro-cid-5tznm7mj>
Aprende a cuidar tu instalación, ahorrar energía y evitar multas de INDECI.
</p> </div> <div class="grid-posts" data-astro-cid-5tznm7mj> ${posts.map((post) => renderTemplate`<article class="card-post group" data-astro-cid-5tznm7mj> <a${addAttribute(`/blog/${post.id}`, "href")} class="link-post" data-astro-cid-5tznm7mj> <div class="contenido" data-astro-cid-5tznm7mj> <div class="header-card" data-astro-cid-5tznm7mj> <span class="fecha-badge" data-astro-cid-5tznm7mj>
📅 ${post.data.pubDate ? post.data.pubDate.toLocaleDateString("es-PE", { year: "numeric", month: "short", day: "numeric" }) : "Reciente"} </span> </div> <h3 class="group-hover:text-cyan-400 transition-colors" data-astro-cid-5tznm7mj>${post.data.title}</h3> <p class="descripcion" data-astro-cid-5tznm7mj>${post.data.description}</p> <div class="footer-card" data-astro-cid-5tznm7mj> <span class="leer-mas" data-astro-cid-5tznm7mj>
Leer artículo
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="arrow-icon" data-astro-cid-5tznm7mj><path d="M5 12h14" data-astro-cid-5tznm7mj></path><path d="m12 5 7 7-7 7" data-astro-cid-5tznm7mj></path></svg> </span> </div> </div> </a> </article>`)} </div> </section> ` })} `;
}, "C:/PROYECTOS/quilla-astro/src/pages/blog/index.astro", void 0);

const $$file = "C:/PROYECTOS/quilla-astro/src/pages/blog/index.astro";
const $$url = "/blog";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
