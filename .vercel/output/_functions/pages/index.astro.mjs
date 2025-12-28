import { c as createComponent, m as maybeRenderHead, a as renderTemplate, r as renderComponent, u as unescapeHTML } from '../chunks/astro/server_DjG7uRHx.mjs';
import { $ as $$MainLayout } from '../chunks/MainLayout_CUJTzj17.mjs';
/* empty css                                 */
import { $ as $$Image } from '../chunks/_astro_assets_D63QpVk_.mjs';
import { _ as __ASTRO_IMAGE_IMPORT_Z25eO72, a as __ASTRO_IMAGE_IMPORT_ZC6dy4 } from '../chunks/cableado-casa_BCCMWSEk.mjs';
export { renderers } from '../renderers.mjs';

const $$Beneficios = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="beneficios-section relative" data-astro-cid-5tjyhmct> <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-blue-900/20 blur-[120px] rounded-full -z-10 pointer-events-none" data-astro-cid-5tjyhmct></div> <h2 class="titulo-brillante" data-astro-cid-5tjyhmct>¿Por qué elegir a Quilla Electric?</h2> <div class="grid-beneficios" data-astro-cid-5tjyhmct> <div class="item-beneficio group" data-astro-cid-5tjyhmct> <span class="icono group-hover:scale-110 transition-transform duration-300" data-astro-cid-5tjyhmct>⚡</span> <h3 data-astro-cid-5tjyhmct>Atención Rápida</h3> <p data-astro-cid-5tjyhmct>En Cerro Colorado y todo Arequipa. Llegamos antes de que se descongele tu refri.</p> </div> <div class="item-beneficio group" data-astro-cid-5tjyhmct> <span class="icono group-hover:scale-110 transition-transform duration-300" data-astro-cid-5tjyhmct>📜</span> <h3 data-astro-cid-5tjyhmct>Certificados INDECI</h3> <p data-astro-cid-5tjyhmct>Firmados por ingenieros colegiados. Garantizamos que pasas la inspección.</p> </div> <div class="item-beneficio group" data-astro-cid-5tjyhmct> <span class="icono group-hover:scale-110 transition-transform duration-300" data-astro-cid-5tjyhmct>💳</span> <h3 data-astro-cid-5tjyhmct>Pago Fácil</h3> <p data-astro-cid-5tjyhmct>Aceptamos efectivo, Yape, Plin y transferencias. Emitimos Factura o Boleta.</p> </div> <div class="item-beneficio group" data-astro-cid-5tjyhmct> <span class="icono group-hover:scale-110 transition-transform duration-300" data-astro-cid-5tjyhmct>🛡️</span> <h3 data-astro-cid-5tjyhmct>Garantía Real</h3> <p data-astro-cid-5tjyhmct>No desaparecemos. Si algo falla, volvemos y lo arreglamos sin costo.</p> </div> </div> </section> `;
}, "C:/PROYECTOS/quilla-astro/src/components/Beneficios.astro", void 0);

const fotoTablero = new Proxy({"src":"/_astro/tablero-industrial.BxI_z7IN.jpeg","width":900,"height":1600,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/PROYECTOS/quilla-astro/src/assets/tablero-industrial.jpeg";
							}
							
							return target[name];
						}
					});

const fotoLed = new Proxy({"src":"/_astro/iluminacion-led.C0Hjn8T2.jpeg","width":1280,"height":576,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/PROYECTOS/quilla-astro/src/assets/iluminacion-led.jpeg";
							}
							
							return target[name];
						}
					});

const $$Galeria = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="galeria-section relative" id="proyectos" data-astro-cid-v237q2e3> <div class="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[100px] rounded-full -z-10 pointer-events-none" data-astro-cid-v237q2e3></div> <div class="contenido-ancho" data-astro-cid-v237q2e3> <h2 class="titulo-brillante" data-astro-cid-v237q2e3>Nuestros Proyectos Recientes</h2> <p class="subtitulo" data-astro-cid-v237q2e3>Calidad y seguridad certificada con tecnología de vanguardia.</p> <div class="grid-galeria" data-astro-cid-v237q2e3> <div class="item-galeria group" data-astro-cid-v237q2e3> ${renderComponent($$result, "Image", $$Image, { "src": fotoTablero, "alt": "Mantenimiento de tablero el\xE9ctrico industrial en Arequipa", "width": 600, "quality": "mid", "class": "img-optimizada group-hover:scale-110 transition-transform duration-700", "data-astro-cid-v237q2e3": true })} <div class="overlay" data-astro-cid-v237q2e3> <h3 data-astro-cid-v237q2e3>Tablero Industrial</h3> <p data-astro-cid-v237q2e3>Mantenimiento y peinado</p> </div> </div> <div class="item-galeria group" data-astro-cid-v237q2e3> ${renderComponent($$result, "Image", $$Image, { "src": __ASTRO_IMAGE_IMPORT_Z25eO72, "alt": "Instalaci\xF3n de Pozo a Tierra en Cayma", "width": 600, "quality": "mid", "class": "img-optimizada group-hover:scale-110 transition-transform duration-700", "data-astro-cid-v237q2e3": true })} <div class="overlay" data-astro-cid-v237q2e3> <h3 data-astro-cid-v237q2e3>Pozo a Tierra</h3> <p data-astro-cid-v237q2e3>Certificación INDECI</p> </div> </div> <div class="item-galeria group" data-astro-cid-v237q2e3> ${renderComponent($$result, "Image", $$Image, { "src": fotoLed, "alt": "Iluminaci\xF3n LED oficinas", "width": 600, "quality": "mid", "class": "img-optimizada group-hover:scale-110 transition-transform duration-700", "data-astro-cid-v237q2e3": true })} <div class="overlay" data-astro-cid-v237q2e3> <h3 data-astro-cid-v237q2e3>Iluminación LED</h3> <p data-astro-cid-v237q2e3>Ahorro de energía</p> </div> </div> <div class="item-galeria group" data-astro-cid-v237q2e3> ${renderComponent($$result, "Image", $$Image, { "src": __ASTRO_IMAGE_IMPORT_ZC6dy4, "alt": "Cableado residencial seguro", "width": 600, "quality": "mid", "class": "img-optimizada group-hover:scale-110 transition-transform duration-700", "data-astro-cid-v237q2e3": true })} <div class="overlay" data-astro-cid-v237q2e3> <h3 data-astro-cid-v237q2e3>Residencial</h3> <p data-astro-cid-v237q2e3>Cableado libre de halógenos</p> </div> </div> </div> </div> </section> `;
}, "C:/PROYECTOS/quilla-astro/src/modules/blog/components/Galeria.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Preguntas = createComponent(($$result, $$props, $$slots) => {
  const preguntas = [
    {
      pregunta: "\xBFCu\xE1nto cuesta el mantenimiento de un Pozo a Tierra?",
      respuesta: "El precio base incluye la limpieza, reactivaci\xF3n con gel y certificado. El costo exacto depende del estado actual del pozo. \xA1Escr\xEDbenos para una visita t\xE9cnica gratuita!"
    },
    {
      pregunta: "\xBFAtienden emergencias los domingos?",
      respuesta: "S\xED, tenemos un equipo de guardia para emergencias el\xE9ctricas las 24 horas, incluyendo domingos y feriados en todo Arequipa."
    },
    {
      pregunta: "\xBFEntregan certificado para Defensa Civil?",
      respuesta: "S\xED. Realizamos el protocolo de pruebas completo y entregamos el certificado de operatividad firmado por un Ingeniero Electricista colegiado y habilitado."
    },
    {
      pregunta: "\xBFMis cables est\xE1n muy viejos, es peligroso?",
      respuesta: "Si tus cables tienen m\xE1s de 20 a\xF1os o son tipo 'mellizo' (blancos planos), son un riesgo de incendio. Recomendamos una inspecci\xF3n para cambiarlos por cables libres de hal\xF3genos."
    }
  ];
  const schemaFAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": preguntas.map((item) => ({
      "@type": "Question",
      "name": item.pregunta,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.respuesta
      }
    }))
  };
  return renderTemplate(_a || (_a = __template(['<script type="application/ld+json">', "<\/script> ", '<section class="faq-section relative" data-astro-cid-4k3ngzmf> <div class="absolute top-1/2 left-0 -translate-y-1/2 w-[300px] h-[300px] bg-purple-600/10 blur-[80px] rounded-full -z-10 pointer-events-none" data-astro-cid-4k3ngzmf></div> <h2 class="titulo-faq" data-astro-cid-4k3ngzmf>Preguntas Frecuentes</h2> <div class="faq-container" data-astro-cid-4k3ngzmf> ', " </div> </section> "])), unescapeHTML(JSON.stringify(schemaFAQ)), maybeRenderHead(), preguntas.map((item) => renderTemplate`<details class="group" data-astro-cid-4k3ngzmf> <summary class="glass-panel" data-astro-cid-4k3ngzmf> <span data-astro-cid-4k3ngzmf>${item.pregunta}</span> <span class="icon" data-astro-cid-4k3ngzmf>+</span> </summary> <div class="respuesta-content" data-astro-cid-4k3ngzmf> <p data-astro-cid-4k3ngzmf>${item.respuesta}</p> </div> </details>`));
}, "C:/PROYECTOS/quilla-astro/src/components/Preguntas.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "titulo": "Inicio", "data-astro-cid-j7pv25f6": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="hero-section relative overflow-hidden" data-astro-cid-j7pv25f6> <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-600/20 blur-[100px] rounded-full -z-10 pointer-events-none" data-astro-cid-j7pv25f6></div> <div class="container mx-auto px-4 py-16 md:py-24 text-center" data-astro-cid-j7pv25f6> <span class="inline-block py-1 px-3 rounded-full bg-blue-900/30 border border-blue-500/30 text-blue-400 text-xs font-bold tracking-wider mb-6 uppercase animate-fade-in" data-astro-cid-j7pv25f6>
⚡ Expertos en Energía
</span> <h1 class="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight animate-fade-in-up" data-astro-cid-j7pv25f6> <span class="text-white" data-astro-cid-j7pv25f6>Soluciones Eléctricas</span> <br class="hidden md:block" data-astro-cid-j7pv25f6> <span class="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200 drop-shadow-lg" data-astro-cid-j7pv25f6>
en Arequipa
</span> </h1> <p class="subtitulo text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up delay-100" data-astro-cid-j7pv25f6>
Especialistas en Pozos a Tierra, Certificaciones INDECI y Emergencias 24/7.
<span class="block mt-2 text-slate-400" data-astro-cid-j7pv25f6>Protege tu negocio y familia hoy mismo con tecnología de vanguardia.</span> </p> <div class="botones flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up delay-200" data-astro-cid-j7pv25f6> <a href="/contacto" class="btn-primary-neon" data-astro-cid-j7pv25f6>
Solicitar Cotización
</a> <a href="/servicios" class="btn-secondary-glass" data-astro-cid-j7pv25f6>
Ver Servicios
</a> </div> </div> </div> <div class="h-px w-full bg-gradient-to-r from-transparent via-blue-500/50 to-transparent my-8" data-astro-cid-j7pv25f6></div> ${renderComponent($$result2, "Beneficios", $$Beneficios, { "data-astro-cid-j7pv25f6": true })} ${renderComponent($$result2, "Galeria", $$Galeria, { "data-astro-cid-j7pv25f6": true })} ${renderComponent($$result2, "Preguntas", $$Preguntas, { "data-astro-cid-j7pv25f6": true })} ` })} `;
}, "C:/PROYECTOS/quilla-astro/src/pages/index.astro", void 0);

const $$file = "C:/PROYECTOS/quilla-astro/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
