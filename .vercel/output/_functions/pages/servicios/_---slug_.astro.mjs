/* empty css                                    */
import { b as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, f as addAttribute } from '../../chunks/astro/server_rXIhwjdR.mjs';
import { g as getCollection, r as renderEntry } from '../../chunks/_astro_content_yAKdrGSJ.mjs';
import { $ as $$MainLayout } from '../../chunks/MainLayout_CFd2u93S.mjs';
import { a as getImage, $ as $$Image } from '../../chunks/_astro_assets_0eZexlWb.mjs';
import { C as CctvWizard } from '../../chunks/CctvWizard_DOACfizk.mjs';
import { d as db } from '../../chunks/config_Bdc6_zUD.mjs';
import { getDocs, collection, doc, getDoc } from 'firebase/firestore';
/* empty css                                     */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://quillaelectric.site");
const prerender = false;
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const { slug } = Astro2.params;
  const servicios = await getCollection("servicios");
  const servicio = servicios.find((s) => s.slug === slug || s.id === slug);
  if (!servicio) {
    return Astro2.redirect("/404");
  }
  const { Content } = await renderEntry(servicio);
  let cloudProducts = [];
  try {
    const querySnapshot = await getDocs(collection(db, "productos"));
    cloudProducts = querySnapshot.docs.map((doc2) => doc2.data());
  } catch (e) {
    console.error("Error conectando a productos:", e);
  }
  let globalConfig = {
    manoObra: 80,
    precioMetroCable: 2.5,
    mensajeWhatsapp: "Hola, me interesa esta cotizaci\xF3n:"
  };
  try {
    const configRef = doc(db, "configuracion", "global");
    const configSnap = await getDoc(configRef);
    if (configSnap.exists()) {
      globalConfig = configSnap.data();
    }
  } catch (e) {
    console.error("Error cargando configuraci\xF3n:", e);
  }
  const imageFiles = /* #__PURE__ */ Object.assign({"/src/assets/camaras/bobina-cat6.png": () => import('../../chunks/bobina-cat6_Du65EdyK.mjs'),"/src/assets/camaras/cb2-bat.png": () => import('../../chunks/cb2-bat_DBK9QYoG.mjs'),"/src/assets/camaras/eb3-bat.png": () => import('../../chunks/eb3-bat_BENvhUNQ.mjs'),"/src/assets/camaras/eb8-4g.png": () => import('../../chunks/eb8-4g_CxRAfgbX.mjs'),"/src/assets/camaras/h1c-mini.png": () => import('../../chunks/h1c-mini_DY4GVUKH.mjs'),"/src/assets/camaras/h3-3k.png": () => import('../../chunks/h3-3k_C8Yhja6y.mjs'),"/src/assets/camaras/h3c-color.png": () => import('../../chunks/h3c-color_CM3rU56q.mjs'),"/src/assets/camaras/h7c-dual.png": () => import('../../chunks/h7c-dual_ExDrEif1.mjs'),"/src/assets/camaras/h80f-triple.png": () => import('../../chunks/h80f-triple_BPSGszNH.mjs'),"/src/assets/camaras/h8c-ptz.png": () => import('../../chunks/h8c-ptz_BJKP7TK2.mjs'),"/src/assets/camaras/h9c-dual.png": () => import('../../chunks/h9c-dual_CmXpdItV.mjs'),"/src/assets/camaras/imou-bullet3.png": () => import('../../chunks/imou-bullet3_tpB4Rwpr.mjs'),"/src/assets/camaras/imou-cruiser-dual.png": () => import('../../chunks/imou-cruiser-dual_Dj_wBtZ3.mjs'),"/src/assets/camaras/imou-ranger-dual.png": () => import('../../chunks/imou-ranger-dual_D2cgzf81.mjs'),"/src/assets/camaras/litebeam.png": () => import('../../chunks/litebeam__IsrVRJB.mjs'),"/src/assets/camaras/microsd.png": () => import('../../chunks/microsd_CGlGOeRD.mjs'),"/src/assets/camaras/nvr-wifi.png": () => import('../../chunks/nvr-wifi_DTiyjxQS.mjs'),"/src/assets/camaras/tapo-c210.png": () => import('../../chunks/tapo-c210_B6AHxIuk.mjs'),"/src/assets/camaras/tapo-c500.png": () => import('../../chunks/tapo-c500_CDN6APVF.mjs')});
  const optimizedProducts = await Promise.all(
    cloudProducts.map(async (product) => {
      const imagePath = `/src/assets/camaras/${product.image}`;
      if (!imageFiles[imagePath]) {
        return product;
      }
      const imageModule = await imageFiles[imagePath]();
      const optimizedImage = await getImage({
        src: imageModule.default,
        format: "webp",
        width: 600,
        quality: 80
      });
      return { ...product, image: optimizedImage.src };
    })
  );
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "titulo": servicio.data.title, "descripcion": servicio.data.description, "data-astro-cid-7ewkavmn": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<article class="detalle-servicio" data-astro-cid-7ewkavmn> <header data-astro-cid-7ewkavmn> <h1 data-astro-cid-7ewkavmn>${servicio.data.title}</h1> <p class="resumen" data-astro-cid-7ewkavmn>${servicio.data.description}</p> </header> ${servicio.data.image && renderTemplate`<div class="imagen-principal" data-astro-cid-7ewkavmn> ${renderComponent($$result2, "Image", $$Image, { "src": servicio.data.image, "alt": servicio.data.title, "width": 800, "class": "foto-redondeada", "data-astro-cid-7ewkavmn": true })} </div>`} <div class="cuerpo-texto" data-astro-cid-7ewkavmn> ${renderComponent($$result2, "Content", Content, { "data-astro-cid-7ewkavmn": true })} </div>  ${servicio.data.widget === "cctv-wizard" && renderTemplate`<div class="zona-herramienta" data-astro-cid-7ewkavmn> <div class="header-herramienta" data-astro-cid-7ewkavmn> <h2 data-astro-cid-7ewkavmn>⚡ Cotizador Inteligente</h2> <p data-astro-cid-7ewkavmn>Precios actualizados en tiempo real.</p> </div> ${renderComponent($$result2, "ServiceGuard", null, { "client:only": "react", "toolId": "cctv-wizard", "client:component-hydration": "only", "data-astro-cid-7ewkavmn": true, "client:component-path": "C:/PROYECTOS/quilla-astro/src/components/ServiceGuard.jsx", "client:component-export": "default" }, { "default": async ($$result3) => renderTemplate`${renderComponent($$result3, "CctvWizard", CctvWizard, { "client:visible": true, "products": optimizedProducts, "config": globalConfig, "client:component-hydration": "visible", "client:component-path": "C:/PROYECTOS/quilla-astro/src/components/CctvWizard.jsx", "client:component-export": "default", "data-astro-cid-7ewkavmn": true })} ` })} </div>`} <div class="cta-box" data-astro-cid-7ewkavmn> <h3 data-astro-cid-7ewkavmn>¿Prefieres asistencia personalizada?</h3> <p data-astro-cid-7ewkavmn>Si tienes dudas sobre la cotización o el servicio, un técnico te atenderá.</p> <a${addAttribute(`https://wa.me/+51951413458?text=Consulta sobre ${servicio.data.title}`, "href")} class="btn-whatsapp" target="_blank" data-astro-cid-7ewkavmn>
📲 Contactar por WhatsApp
</a> </div> </article> ` })} `;
}, "C:/PROYECTOS/quilla-astro/src/pages/servicios/[...slug].astro", void 0);

const $$file = "C:/PROYECTOS/quilla-astro/src/pages/servicios/[...slug].astro";
const $$url = "/servicios/[...slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
