import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DjG7uRHx.mjs';
import { $ as $$MainLayout } from '../chunks/MainLayout_CUJTzj17.mjs';
/* empty css                               */
export { renderers } from '../renderers.mjs';

const $$404 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "titulo": "404 - Cortocircuito", "descripcion": "P\xE1gina no encontrada", "data-astro-cid-zetdm5md": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 relative overflow-hidden" data-astro-cid-zetdm5md> <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/10 blur-[100px] rounded-full -z-10 pointer-events-none" data-astro-cid-zetdm5md></div> <h1 class="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-slate-700 to-slate-900 mb-4 select-none" data-astro-cid-zetdm5md>
404
</h1> <div class="relative z-10" data-astro-cid-zetdm5md> <h2 class="text-3xl md:text-4xl font-bold text-white mb-4" data-astro-cid-zetdm5md>
¡Ups! Hubo un <span class="text-red-500" data-astro-cid-zetdm5md>Cortocircuito</span> </h2> <p class="text-slate-400 text-lg mb-8 max-w-md mx-auto" data-astro-cid-zetdm5md>
La página que buscas se ha fundido o nunca existió. Revisa tus conexiones o vuelve a la base.
</p> <a href="/" class="btn-home" data-astro-cid-zetdm5md>
🔙 Volver al Inicio
</a> </div> </div> ` })} `;
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
