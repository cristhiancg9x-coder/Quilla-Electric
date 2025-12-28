import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, f as addAttribute } from '../chunks/astro/server_DjG7uRHx.mjs';
import { $ as $$MainLayout } from '../chunks/MainLayout_CUJTzj17.mjs';
import { g as getCollection } from '../chunks/_astro_content_C3m_sXT3.mjs';
import { $ as $$Image } from '../chunks/_astro_assets_D63QpVk_.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const servicios = await getCollection("servicios");
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "titulo": "Nuestros Servicios", "descripcion": "Lista de servicios el\xE9ctricos profesionales en Arequipa.", "data-astro-cid-hezqo47o": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="relative py-12 md:py-20 px-4" data-astro-cid-hezqo47o> <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-blue-900/20 blur-[100px] rounded-full -z-10 pointer-events-none" data-astro-cid-hezqo47o></div> <div class="header-servicios text-center mb-16 animate-fade-in-down" data-astro-cid-hezqo47o> <span class="inline-block py-1 px-3 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-bold tracking-wider mb-4 uppercase" data-astro-cid-hezqo47o>
Catálogo de Soluciones
</span> <h1 class="text-4xl md:text-5xl font-extrabold mb-4 text-white" data-astro-cid-hezqo47o>
Soluciones Eléctricas <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500" data-astro-cid-hezqo47o>Profesionales</span> </h1> <p class="text-slate-400 text-lg max-w-2xl mx-auto" data-astro-cid-hezqo47o>
Atendemos emergencias y proyectos en todo Cerro Colorado y Arequipa con tecnología de punta.
</p> </div> <div class="grid-servicios" data-astro-cid-hezqo47o> ${servicios.length === 0 && renderTemplate`<p class="text-slate-500 text-center col-span-full" data-astro-cid-hezqo47o>No hay servicios cargados aún.</p>`} ${servicios.map((servicio) => renderTemplate`<a${addAttribute(`/servicios/${servicio.id}`, "href")} class="tarjeta-servicio group" data-astro-cid-hezqo47o> ${servicio.data.image && renderTemplate`<div class="img-container" data-astro-cid-hezqo47o> ${renderComponent($$result2, "Image", $$Image, { "src": servicio.data.image, "alt": servicio.data.title, "width": 500, "class": "img-zoom", "data-astro-cid-hezqo47o": true })} <div class="img-overlay" data-astro-cid-hezqo47o></div> </div>`} <div class="contenido" data-astro-cid-hezqo47o> <h3 class="group-hover:text-cyan-400 transition-colors" data-astro-cid-hezqo47o>${servicio.data.title}</h3> <p class="descripcion" data-astro-cid-hezqo47o>${servicio.data.description}</p> <div class="footer-card" data-astro-cid-hezqo47o> ${servicio.data.price && renderTemplate`<span class="precio-badge" data-astro-cid-hezqo47o> <span class="text-yellow-400" data-astro-cid-hezqo47o>⚡</span> ${servicio.data.price} </span>`} <span class="btn-ver" data-astro-cid-hezqo47o>
Ver Detalles
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="arrow-icon" data-astro-cid-hezqo47o><path d="M5 12h14" data-astro-cid-hezqo47o></path><path d="m12 5 7 7-7 7" data-astro-cid-hezqo47o></path></svg> </span> </div> </div> </a>`)} </div> </section> ` })} `;
}, "C:/PROYECTOS/quilla-astro/src/pages/servicios/index.astro", void 0);

const $$file = "C:/PROYECTOS/quilla-astro/src/pages/servicios/index.astro";
const $$url = "/servicios";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
