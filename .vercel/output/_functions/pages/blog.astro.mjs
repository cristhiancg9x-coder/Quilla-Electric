import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, f as addAttribute } from '../chunks/astro/server_DjG7uRHx.mjs';
import { $ as $$MainLayout } from '../chunks/MainLayout_CB30UFig.mjs';
import { g as getCollection } from '../chunks/_astro_content_ScRb_5Kn.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const posts = (await getCollection("blog")).sort((a, b) => {
    const fechaA = a.data.pubDate ? a.data.pubDate.valueOf() : 0;
    const fechaB = b.data.pubDate ? b.data.pubDate.valueOf() : 0;
    return fechaB - fechaA;
  });
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "titulo": "Blog de Electricidad", "descripcion": "Consejos y noticias sobre seguridad el\xE9ctrica en Per\xFA.", "data-astro-cid-5tznm7mj": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="blog-header" data-astro-cid-5tznm7mj> <h1 data-astro-cid-5tznm7mj>📰 Blog Eléctrico</h1> <p data-astro-cid-5tznm7mj>Aprende a cuidar tu instalación y ahorrar energía.</p> </section> <div class="grid-posts" data-astro-cid-5tznm7mj> ${posts.map((post) => renderTemplate`<article class="card-post" data-astro-cid-5tznm7mj> <a${addAttribute(`/blog/${post.id}`, "href")} class="link-post" data-astro-cid-5tznm7mj> <div class="contenido" data-astro-cid-5tznm7mj> <h3 data-astro-cid-5tznm7mj>${post.data.title}</h3> <p class="fecha" data-astro-cid-5tznm7mj> ${post.data.pubDate ? post.data.pubDate.toLocaleDateString("es-PE", { year: "numeric", month: "long", day: "numeric" }) : "Reciente"} </p> <p class="descripcion" data-astro-cid-5tznm7mj>${post.data.description}</p> <span class="leer-mas" data-astro-cid-5tznm7mj>Leer artículo →</span> </div> </a> </article>`)} </div> ` })} `;
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
