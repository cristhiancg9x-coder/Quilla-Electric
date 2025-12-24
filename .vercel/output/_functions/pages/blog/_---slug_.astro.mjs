/* empty css                                    */
import { b as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from '../../chunks/astro/server_rXIhwjdR.mjs';
import { r as renderEntry, g as getCollection } from '../../chunks/_astro_content_yAKdrGSJ.mjs';
import { $ as $$MainLayout } from '../../chunks/MainLayout_CFd2u93S.mjs';
/* empty css                                     */
export { renderers } from '../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://quillaelectric.site");
async function getStaticPaths() {
  const posts = await getCollection("blog");
  return posts.map((post) => ({
    params: { slug: post.id },
    props: post
  }));
}
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const post = Astro2.props;
  const { Content } = await renderEntry(post);
  const imagenOG = post.data.image?.src || "/img/blog-default.jpg";
  const urlCompleta = new URL(Astro2.url.pathname, Astro2.site);
  const fechaPublicacion = post.data.pubDate ? new Date(post.data.pubDate).toISOString().split("T")[0] : (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const fechaLegible = post.data.pubDate ? new Date(post.data.pubDate).toLocaleDateString("es-PE") : "Reciente";
  const schemaArticle = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": urlCompleta
    },
    "headline": post.data.title,
    "description": post.data.description,
    "image": imagenOG,
    "author": {
      "@type": "Person",
      "name": post.data.author || "Quilla Electric"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Quilla Electric",
      "logo": {
        "@type": "ImageObject",
        "url": "https://quillaelectric.site/favicon.png"
      }
    },
    "datePublished": fechaPublicacion,
    "dateModified": fechaPublicacion
  };
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "titulo": post.data.title, "descripcion": post.data.description, "imagen": imagenOG, "data-astro-cid-7jjqptxk": true }, { "default": async ($$result2) => renderTemplate(_a || (_a = __template([' <script type="application/ld+json">', "<\/script> ", '<article class="articulo-completo" data-astro-cid-7jjqptxk> <header class="encabezado-articulo" data-astro-cid-7jjqptxk> <p class="meta" data-astro-cid-7jjqptxk>\n\u{1F4C5} ', " | \u270D\uFE0F ", " </p> <h1 data-astro-cid-7jjqptxk>", '</h1> <hr class="separador-amarillo" data-astro-cid-7jjqptxk> </header> <div class="contenido-texto" data-astro-cid-7jjqptxk> ', ' </div> <div class="cta-box" data-astro-cid-7jjqptxk> <h3 data-astro-cid-7jjqptxk>\xBFNecesitas ayuda con esto?</h3> <p data-astro-cid-7jjqptxk>Evita riesgos el\xE9ctricos en tu hogar.</p> <a href="/contacto" class="btn-whatsapp" data-astro-cid-7jjqptxk>Consultar al T\xE9cnico</a> </div> </article> '])), unescapeHTML(JSON.stringify(schemaArticle)), maybeRenderHead(), fechaLegible, post.data.author, post.data.title, renderComponent($$result2, "Content", Content, { "data-astro-cid-7jjqptxk": true })) })} `;
}, "C:/PROYECTOS/quilla-astro/src/pages/blog/[...slug].astro", void 0);

const $$file = "C:/PROYECTOS/quilla-astro/src/pages/blog/[...slug].astro";
const $$url = "/blog/[...slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
