import { c as createComponent, d as renderHead, r as renderComponent, a as renderTemplate } from '../chunks/astro/server_DjG7uRHx.mjs';
/* empty css                                 */
import { jsxs, jsx } from 'react/jsx-runtime';
import 'react';
import { a as loginWithGoogle } from '../chunks/authStore_Doj8OU2W.mjs';
export { renderers } from '../renderers.mjs';

function LoginButton() {
  return /* @__PURE__ */ jsxs(
    "button",
    {
      onClick: loginWithGoogle,
      className: "w-full bg-white hover:bg-gray-100 text-slate-900 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-3 transition-transform hover:scale-105",
      children: [
        /* @__PURE__ */ jsx("div", { className: "w-5 h-5", children: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", width: "24", height: "24", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxs("g", { transform: "matrix(1, 0, 0, 1, 27.009001, -39.238998)", children: [
          /* @__PURE__ */ jsx("path", { fill: "#4285F4", d: "M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" }),
          /* @__PURE__ */ jsx("path", { fill: "#34A853", d: "M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z" }),
          /* @__PURE__ */ jsx("path", { fill: "#FBBC05", d: "M -21.484 53.529 C -21.734 52.769 -21.864 51.959 -21.864 51.129 C -21.864 50.299 -21.734 49.489 -21.484 48.729 L -21.484 45.639 L -25.464 45.639 C -26.284 47.269 -26.754 49.129 -26.754 51.129 C -26.754 53.129 -26.284 54.989 -25.464 56.619 L -21.484 53.529 Z" }),
          /* @__PURE__ */ jsx("path", { fill: "#EA4335", d: "M -14.754 43.769 C -12.984 43.769 -11.404 44.379 -10.154 45.579 L -6.734 42.159 C -8.804 40.229 -11.514 39.009 -14.754 39.009 C -19.444 39.009 -23.494 41.709 -25.464 45.639 L -21.484 48.729 C -20.534 45.879 -17.884 43.769 -14.754 43.769 Z" })
        ] }) }) }),
        "Continuar con Google"
      ]
    }
  );
}

const $$Login = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="es" class="dark"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><title>Acceso Quilla SaaS</title>${renderHead()}</head> <body class="bg-slate-950 flex items-center justify-center h-screen font-sans"> <div class="relative group w-full max-w-md p-1"> <div class="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl blur opacity-75 animate-tilt"></div> <div class="relative bg-slate-900 border border-slate-800 p-8 rounded-xl shadow-2xl text-center"> <h1 class="text-3xl font-bold text-white mb-2">Bienvenido</h1> <p class="text-slate-400 mb-8">Ingresa para acceder a las herramientas de ingeniería.</p> ${renderComponent($$result, "LoginButton", LoginButton, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/modules/auth/components/LoginButton.jsx", "client:component-export": "default" })} <p class="text-xs text-slate-600 mt-6">
Al continuar, aceptas los términos de servicio de Quilla Electric SaaS.
</p> </div> </div> </body></html>`;
}, "C:/PROYECTOS/quilla-astro/src/pages/login.astro", void 0);

const $$file = "C:/PROYECTOS/quilla-astro/src/pages/login.astro";
const $$url = "/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
