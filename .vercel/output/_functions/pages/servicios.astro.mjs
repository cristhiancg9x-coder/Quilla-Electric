/* empty css                                 */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, f as addAttribute } from '../chunks/astro/server_rXIhwjdR.mjs';
import { $ as $$MainLayout } from '../chunks/MainLayout_CFd2u93S.mjs';
import { g as getCollection } from '../chunks/_astro_content_yAKdrGSJ.mjs';
import { $ as $$Image } from '../chunks/_astro_assets_0eZexlWb.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const servicios = await getCollection("servicios");
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "titulo": "Nuestros Servicios", "descripcion": "Lista de servicios el\xE9ctricos profesionales en Arequipa.", "data-astro-cid-hezqo47o": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="header-servicios" data-astro-cid-hezqo47o> <h1 data-astro-cid-hezqo47o>Soluciones Eléctricas Profesionales</h1> <p data-astro-cid-hezqo47o>Atendemos emergencias y proyectos en todo Cerro Colorado y Arequipa.</p> </div> <div class="grid-servicios" data-astro-cid-hezqo47o> ${servicios.length === 0 && renderTemplate`<p style="text-align: center" data-astro-cid-hezqo47o>No hay servicios cargados aún.</p>`} ${servicios.map((servicio) => (
    /* CAMBIO CLAVE: 
       La tarjeta ahora es una etiqueta <a> (un enlace gigante).
       Esto hace que TODO sea clicable.
    */
    renderTemplate`<a${addAttribute(`/servicios/${servicio.id}`, "href")} class="tarjeta-servicio" data-astro-cid-hezqo47o> ${servicio.data.image && renderTemplate`<div class="img-container" data-astro-cid-hezqo47o> ${renderComponent($$result2, "Image", $$Image, { "src": servicio.data.image, "alt": servicio.data.title, "width": 400, "data-astro-cid-hezqo47o": true })} </div>`} <div class="contenido" data-astro-cid-hezqo47o> <h3 data-astro-cid-hezqo47o>${servicio.data.title}</h3> <p data-astro-cid-hezqo47o>${servicio.data.description}</p> ${servicio.data.price && renderTemplate`<p class="precio" data-astro-cid-hezqo47o>💰 ${servicio.data.price}</p>`}  <span class="btn-ver" data-astro-cid-hezqo47o>Ver Detalles →</span> </div> </a>`
  ))} </div> ` })} `;
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
