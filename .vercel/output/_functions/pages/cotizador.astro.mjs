/* empty css                                 */
import { b as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_rXIhwjdR.mjs';
import { $ as $$MainLayout } from '../chunks/MainLayout_CFd2u93S.mjs';
import { C as CctvWizard } from '../chunks/CctvWizard_DOACfizk.mjs';
import { p as productsData } from '../chunks/cctv-products_cBGzD3Uk.mjs';
import { a as getImage } from '../chunks/_astro_assets_0eZexlWb.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://quillaelectric.site");
const $$Cotizador = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Cotizador;
  const imageFiles = /* #__PURE__ */ Object.assign({"/src/assets/camaras/bobina-cat6.png": () => import('../chunks/bobina-cat6_Du65EdyK.mjs'),"/src/assets/camaras/cb2-bat.png": () => import('../chunks/cb2-bat_DBK9QYoG.mjs'),"/src/assets/camaras/eb3-bat.png": () => import('../chunks/eb3-bat_BENvhUNQ.mjs'),"/src/assets/camaras/eb8-4g.png": () => import('../chunks/eb8-4g_CxRAfgbX.mjs'),"/src/assets/camaras/h1c-mini.png": () => import('../chunks/h1c-mini_DY4GVUKH.mjs'),"/src/assets/camaras/h3-3k.png": () => import('../chunks/h3-3k_C8Yhja6y.mjs'),"/src/assets/camaras/h3c-color.png": () => import('../chunks/h3c-color_CM3rU56q.mjs'),"/src/assets/camaras/h7c-dual.png": () => import('../chunks/h7c-dual_ExDrEif1.mjs'),"/src/assets/camaras/h80f-triple.png": () => import('../chunks/h80f-triple_BPSGszNH.mjs'),"/src/assets/camaras/h8c-ptz.png": () => import('../chunks/h8c-ptz_BJKP7TK2.mjs'),"/src/assets/camaras/h9c-dual.png": () => import('../chunks/h9c-dual_CmXpdItV.mjs'),"/src/assets/camaras/imou-bullet3.png": () => import('../chunks/imou-bullet3_tpB4Rwpr.mjs'),"/src/assets/camaras/imou-cruiser-dual.png": () => import('../chunks/imou-cruiser-dual_Dj_wBtZ3.mjs'),"/src/assets/camaras/imou-ranger-dual.png": () => import('../chunks/imou-ranger-dual_D2cgzf81.mjs'),"/src/assets/camaras/litebeam.png": () => import('../chunks/litebeam__IsrVRJB.mjs'),"/src/assets/camaras/microsd.png": () => import('../chunks/microsd_CGlGOeRD.mjs'),"/src/assets/camaras/nvr-wifi.png": () => import('../chunks/nvr-wifi_DTiyjxQS.mjs'),"/src/assets/camaras/tapo-c210.png": () => import('../chunks/tapo-c210_B6AHxIuk.mjs'),"/src/assets/camaras/tapo-c500.png": () => import('../chunks/tapo-c500_CDN6APVF.mjs')});
  const optimizedProducts = await Promise.all(
    productsData.map(async (product) => {
      const imagePath = `/src/assets/camaras/${product.image}`;
      if (!imageFiles[imagePath]) {
        console.error(`\u26A0\uFE0F Alerta: No encontr\xE9 la imagen ${product.image} en src/assets/camaras`);
        return product;
      }
      const imageModule = await imageFiles[imagePath]();
      const optimizedImage = await getImage({
        src: imageModule.default,
        format: "webp",
        // ¡Conversión automática!
        width: 600,
        // Redimensionado automático
        quality: 80
        // Compresión inteligente
      });
      return {
        ...product,
        image: optimizedImage.src
      };
    })
  );
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Configurador CCTV | Quilla Electric", "description": "Dise\xF1a tu propio sistema de seguridad en 3 pasos." }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="py-20 px-4 bg-slate-950 min-h-screen"> <div class="text-center mb-12"> <h1 class="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
Diseña tu Sistema de Seguridad
</h1> <p class="text-slate-300 max-w-2xl mx-auto text-lg">
Responde unas preguntas simples y nuestro algoritmo te recomendará las mejores cámaras para tu espacio.
</p> </div> ${renderComponent($$result2, "CctvWizard", CctvWizard, { "client:load": true, "products": optimizedProducts, "config": {}, "client:component-hydration": "load", "client:component-path": "C:/PROYECTOS/quilla-astro/src/components/CctvWizard.jsx", "client:component-export": "default" })} </section> ` })}`;
}, "C:/PROYECTOS/quilla-astro/src/pages/cotizador.astro", void 0);

const $$file = "C:/PROYECTOS/quilla-astro/src/pages/cotizador.astro";
const $$url = "/cotizador";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Cotizador,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
