import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_DGUMb2q2.mjs';
import { manifest } from './manifest_CPAw-5VV.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/admin.astro.mjs');
const _page3 = () => import('./pages/api/status.astro.mjs');
const _page4 = () => import('./pages/blog.astro.mjs');
const _page5 = () => import('./pages/blog/_---slug_.astro.mjs');
const _page6 = () => import('./pages/contacto.astro.mjs');
const _page7 = () => import('./pages/cotizador.astro.mjs');
const _page8 = () => import('./pages/electricista-en/_lugar_.astro.mjs');
const _page9 = () => import('./pages/login.astro.mjs');
const _page10 = () => import('./pages/rss.xml.astro.mjs');
const _page11 = () => import('./pages/servicios.astro.mjs');
const _page12 = () => import('./pages/servicios/_---slug_.astro.mjs');
const _page13 = () => import('./pages/test.astro.mjs');
const _page14 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/.pnpm/astro@5.16.4_@types+node@24_e36c7ac7979a62e4404424fbfdca8829/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/admin/index.astro", _page2],
    ["src/pages/api/status.js", _page3],
    ["src/pages/blog/index.astro", _page4],
    ["src/pages/blog/[...slug].astro", _page5],
    ["src/pages/contacto.astro", _page6],
    ["src/pages/cotizador.astro", _page7],
    ["src/pages/electricista-en/[lugar].astro", _page8],
    ["src/pages/login.astro", _page9],
    ["src/pages/rss.xml.js", _page10],
    ["src/pages/servicios/index.astro", _page11],
    ["src/pages/servicios/[...slug].astro", _page12],
    ["src/pages/test.astro", _page13],
    ["src/pages/index.astro", _page14]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "0d0982b1-9f38-4019-89cf-c4fa54eeee16",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
