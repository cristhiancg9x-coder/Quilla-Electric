import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DjG7uRHx.mjs';
import { $ as $$MainLayout } from '../chunks/MainLayout_CB30UFig.mjs';
/* empty css                               */
export { renderers } from '../renderers.mjs';

const $$404 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "titulo": "P\xE1gina no encontrada", "data-astro-cid-zetdm5md": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="error-container" data-astro-cid-zetdm5md> <span class="icono-error" data-astro-cid-zetdm5md>🔌</span> <h1 data-astro-cid-zetdm5md>¡Ups! Hubo un corte de luz</h1> <p data-astro-cid-zetdm5md>La página que buscas no existe o se ha movido.</p> <a href="/" class="btn-volver" data-astro-cid-zetdm5md>
Volver al Inicio (Reconectar)
</a> </div> ` })} `;
}, "C:/PROYECTOS/quilla-astro/src/pages/404.astro", void 0);

const $$file = "C:/PROYECTOS/quilla-astro/src/pages/404.astro";
const $$url = "/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$404,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
