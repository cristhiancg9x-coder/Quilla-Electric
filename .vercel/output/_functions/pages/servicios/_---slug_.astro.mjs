import { b as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, f as addAttribute, m as maybeRenderHead } from '../../chunks/astro/server_DjG7uRHx.mjs';
import { g as getCollection, r as renderEntry } from '../../chunks/_astro_content_C3m_sXT3.mjs';
import { $ as $$MainLayout } from '../../chunks/MainLayout_CUJTzj17.mjs';
import { a as getImage, $ as $$Image } from '../../chunks/_astro_assets_D63QpVk_.mjs';
import { d as db } from '../../chunks/config_BZ9jvQ5Q.mjs';
import { getDocs, collection, doc, getDoc } from 'firebase/firestore';
/* empty css                                     */
export { renderers } from '../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
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
  await Promise.all(
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
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "titulo": servicio.data.title, "descripcion": servicio.data.description, "data-astro-cid-7ewkavmn": true }, { "default": async ($$result2) => renderTemplate(_a || (_a = __template([" ", '<div class="relative w-full overflow-hidden" data-astro-cid-7ewkavmn> <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full -z-10 pointer-events-none" data-astro-cid-7ewkavmn></div> <div class="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full -z-10 pointer-events-none" data-astro-cid-7ewkavmn></div> <article class="detalle-servicio glass-panel" data-astro-cid-7ewkavmn> <header data-astro-cid-7ewkavmn> <h1 class="text-3xl md:text-5xl font-extrabold mb-4 text-white" data-astro-cid-7ewkavmn> ', ' </h1> <p class="resumen" data-astro-cid-7ewkavmn>', "</p> </header> ", ' <div id="content-container" class="relative group mt-8" data-astro-cid-7ewkavmn> <div id="text-wrapper" class="prose prose-invert prose-lg max-w-none text-slate-300 mb-8 overflow-hidden max-h-[400px] md:max-h-none transition-all duration-500 ease-in-out" data-astro-cid-7ewkavmn> ', ` </div> <div id="fade-overlay" class="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0f172a] to-transparent md:hidden pointer-events-none" data-astro-cid-7ewkavmn></div> </div> <button id="toggle-btn" class="w-full md:hidden bg-slate-800/50 text-cyan-400 font-bold py-3 rounded-xl border border-cyan-500/30 mb-8 hover:bg-slate-800 transition-colors flex justify-center items-center gap-2 group backdrop-blur-sm" data-astro-cid-7ewkavmn> <span data-astro-cid-7ewkavmn>\u2B07 Leer descripci\xF3n completa</span> </button> <script>
            const btn = document.getElementById('toggle-btn');
            const wrapper = document.getElementById('text-wrapper');
            const overlay = document.getElementById('fade-overlay');
            let isExpanded = false;

            if(btn) {
                btn.addEventListener('click', () => {
                    isExpanded = !isExpanded;
                    
                    if (isExpanded) {
                        wrapper.style.maxHeight = wrapper.scrollHeight + "px"; // Abrir
                        overlay.style.opacity = "0"; // Quitar sombra
                        btn.innerHTML = "\u2B06 Mostrar menos";
                        // Clases activas modo dark
                        btn.classList.add('bg-cyan-900/20', 'border-cyan-500');
                    } else {
                        wrapper.style.maxHeight = "400px"; // Cerrar
                        overlay.style.opacity = "1"; // Poner sombra
                        btn.innerHTML = "\u2B07 Leer descripci\xF3n completa";
                        btn.classList.remove('bg-cyan-900/20', 'border-cyan-500');
                        wrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                });
            }
        <\/script> `, ' <div class="contact-box-glass mt-12" data-astro-cid-7ewkavmn> <h3 class="text-xl font-bold text-white mb-2" data-astro-cid-7ewkavmn>\xBFPrefieres asistencia personalizada?</h3> <p class="text-slate-400 mb-6" data-astro-cid-7ewkavmn>Si tienes dudas sobre la cotizaci\xF3n o el servicio, un t\xE9cnico te atender\xE1.</p> <a', ' class="btn-whatsapp-neon" target="_blank" data-astro-cid-7ewkavmn>\n\u{1F4F2} Contactar por WhatsApp\n</a> </div> </article> </div> <div class="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 md:hidden w-max" data-astro-cid-7ewkavmn> <a href="/cotizador" class="flex items-center gap-3 bg-slate-900 text-white px-6 py-3 rounded-full shadow-xl shadow-blue-900/40 border border-blue-500/30 backdrop-blur-md font-bold text-sm animate-pulse-slow" data-astro-cid-7ewkavmn> <span class="bg-blue-600 p-1 rounded-full flex items-center justify-center" data-astro-cid-7ewkavmn> <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-7ewkavmn><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" data-astro-cid-7ewkavmn></path></svg> </span> <span data-astro-cid-7ewkavmn>Cotizar Ahora</span> </a> </div> '])), maybeRenderHead(), servicio.data.title, servicio.data.description, servicio.data.image && renderTemplate`<div class="imagen-principal group" data-astro-cid-7ewkavmn> ${renderComponent($$result2, "Image", $$Image, { "src": servicio.data.image, "alt": servicio.data.title, "width": 800, "class": "foto-redondeada", "data-astro-cid-7ewkavmn": true })} <div class="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-cyan-500/50 transition-colors pointer-events-none" data-astro-cid-7ewkavmn></div> </div>`, renderComponent($$result2, "Content", Content, { "data-astro-cid-7ewkavmn": true }), servicio.data.widget === "cctv-wizard" && renderTemplate`<div class="cta-card-neon relative overflow-hidden group" data-astro-cid-7ewkavmn> <div class="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-blob" data-astro-cid-7ewkavmn></div> <div class="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-blob animation-delay-2000" data-astro-cid-7ewkavmn></div> <div class="relative z-10 text-center" data-astro-cid-7ewkavmn> <span class="bg-blue-500/20 text-blue-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block border border-blue-500/30" data-astro-cid-7ewkavmn>
Herramienta Exclusiva
</span> <h3 class="text-2xl md:text-3xl font-bold mb-3 text-white" data-astro-cid-7ewkavmn>¿Listo para diseñar tu sistema?</h3> <p class="text-slate-300 mb-8 max-w-lg mx-auto" data-astro-cid-7ewkavmn>
Usa nuestro <strong data-astro-cid-7ewkavmn>Asistente Inteligente</strong>. Responde 3 preguntas y obtén tu precio exacto al instante.
</p> <a href="/cotizador" class="inline-flex items-center justify-center gap-2 bg-white text-slate-900 font-bold px-8 py-4 rounded-xl hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.3)] w-full md:w-auto" data-astro-cid-7ewkavmn> <span data-astro-cid-7ewkavmn>🚀 Abrir Cotizador Inteligente</span> </a> <p class="mt-4 text-xs text-slate-500" data-astro-cid-7ewkavmn>Sin compromiso • Precios actualizados</p> </div> </div>`, addAttribute(`https://wa.me/+51951413458?text=Consulta sobre ${servicio.data.title}`, "href")) })} `;
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
