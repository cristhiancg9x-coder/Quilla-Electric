import { b as createAstro, c as createComponent, m as maybeRenderHead, a as renderTemplate } from '../chunks/astro/server_DjG7uRHx.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://quillaelectric.site");
const prerender = false;
const $$Test = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Test;
  const tiempo = (/* @__PURE__ */ new Date()).toLocaleTimeString();
  return renderTemplate`<html> ${maybeRenderHead()}<body> <h1>✅ EL SERVIDOR FUNCIONA</h1> <p>Si lees esto, Astro y Vercel están bien conectados.</p> <p>Hora del servidor: ${tiempo}</p> </body></html>`;
}, "C:/PROYECTOS/quilla-astro/src/pages/test.astro", void 0);

const $$file = "C:/PROYECTOS/quilla-astro/src/pages/test.astro";
const $$url = "/test";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Test,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
