/* empty css                                 */
import { c as createComponent, m as maybeRenderHead, a as renderTemplate, b as createAstro, r as renderComponent, u as unescapeHTML } from '../chunks/astro/server_rXIhwjdR.mjs';
import { $ as $$MainLayout } from '../chunks/MainLayout_CFd2u93S.mjs';
/* empty css                                 */
import { $ as $$Image } from '../chunks/_astro_assets_0eZexlWb.mjs';
import { _ as __ASTRO_IMAGE_IMPORT_Z25eO72, a as __ASTRO_IMAGE_IMPORT_ZC6dy4 } from '../chunks/cableado-casa_BCCMWSEk.mjs';
export { renderers } from '../renderers.mjs';

const $$Beneficios = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="beneficios-section" data-astro-cid-5tjyhmct> <h2 data-astro-cid-5tjyhmct>¿Por qué elegir a Quilla Electric?</h2> <div class="grid-beneficios" data-astro-cid-5tjyhmct> <div class="item-beneficio" data-astro-cid-5tjyhmct> <span class="icono" data-astro-cid-5tjyhmct>⚡</span> <h3 data-astro-cid-5tjyhmct>Atención Rápida</h3> <p data-astro-cid-5tjyhmct>En Cerro Colorado y todo Arequipa. Llegamos antes de que se descongele tu refri.</p> </div> <div class="item-beneficio" data-astro-cid-5tjyhmct> <span class="icono" data-astro-cid-5tjyhmct>📜</span> <h3 data-astro-cid-5tjyhmct>Certificados INDECI</h3> <p data-astro-cid-5tjyhmct>Firmados por ingenieros colegiados. Garantizamos que pasas la inspección.</p> </div> <div class="item-beneficio" data-astro-cid-5tjyhmct> <span class="icono" data-astro-cid-5tjyhmct>💳</span> <h3 data-astro-cid-5tjyhmct>Pago Fácil</h3> <p data-astro-cid-5tjyhmct>Aceptamos efectivo, Yape, Plin y transferencias. Emitimos Factura o Boleta.</p> </div> <div class="item-beneficio" data-astro-cid-5tjyhmct> <span class="icono" data-astro-cid-5tjyhmct>🛡️</span> <h3 data-astro-cid-5tjyhmct>Garantía Real</h3> <p data-astro-cid-5tjyhmct>No desaparecemos. Si algo falla, volvemos y lo arreglamos sin costo.</p> </div> </div> </section> `;
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

const $$Astro = createAstro("https://quillaelectric.site");
const $$Galeria = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Galeria;
  return renderTemplate`${maybeRenderHead()}<section class="galeria-section" id="proyectos" data-astro-cid-zz5di7e4> <div class="contenido-ancho" data-astro-cid-zz5di7e4> <h2 data-astro-cid-zz5di7e4>Nuestros Proyectos Recientes</h2> <p class="subtitulo" data-astro-cid-zz5di7e4>Calidad y seguridad certificada.</p> <div class="grid-galeria" data-astro-cid-zz5di7e4> <div class="item-galeria" data-astro-cid-zz5di7e4> ${renderComponent($$result, "Image", $$Image, { "src": fotoTablero, "alt": "Mantenimiento de tablero el\xE9ctrico industrial en Arequipa", "width": 600, "quality": "mid", "class": "img-optimizada", "data-astro-cid-zz5di7e4": true })} <div class="overlay" data-astro-cid-zz5di7e4> <h3 data-astro-cid-zz5di7e4>Tablero Industrial</h3> <p data-astro-cid-zz5di7e4>Mantenimiento y peinado</p> </div> </div> <div class="item-galeria" data-astro-cid-zz5di7e4> ${renderComponent($$result, "Image", $$Image, { "src": __ASTRO_IMAGE_IMPORT_Z25eO72, "alt": "Instalaci\xF3n de Pozo a Tierra en Cayma", "width": 600, "quality": "mid", "class": "img-optimizada", "data-astro-cid-zz5di7e4": true })} <div class="overlay" data-astro-cid-zz5di7e4> <h3 data-astro-cid-zz5di7e4>Pozo a Tierra</h3> <p data-astro-cid-zz5di7e4>Certificación INDECI</p> </div> </div> <div class="item-galeria" data-astro-cid-zz5di7e4> ${renderComponent($$result, "Image", $$Image, { "src": fotoLed, "alt": "Iluminaci\xF3n LED oficinas", "width": 600, "quality": "mid", "class": "img-optimizada", "data-astro-cid-zz5di7e4": true })} <div class="overlay" data-astro-cid-zz5di7e4> <h3 data-astro-cid-zz5di7e4>Iluminación LED</h3> <p data-astro-cid-zz5di7e4>Ahorro de energía</p> </div> </div> <div class="item-galeria" data-astro-cid-zz5di7e4> ${renderComponent($$result, "Image", $$Image, { "src": __ASTRO_IMAGE_IMPORT_ZC6dy4, "alt": "Cableado residencial seguro", "width": 600, "quality": "mid", "class": "img-optimizada", "data-astro-cid-zz5di7e4": true })} <div class="overlay" data-astro-cid-zz5di7e4> <h3 data-astro-cid-zz5di7e4>Residencial</h3> <p data-astro-cid-zz5di7e4>Cableado libre de halógenos</p> </div> </div> </div> </div> </section> `;
}, "C:/PROYECTOS/quilla-astro/src/components/Galeria.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Preguntas = createComponent(($$result, $$props, $$slots) => {
  const preguntas = [
    {
      pregunta: "\xBFQuanto cuesta el mantenimiento de un Pozo a Tierra?",
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
  return renderTemplate(_a || (_a = __template(['<script type="application/ld+json">', "<\/script> ", '<section class="faq-section" data-astro-cid-4k3ngzmf> <h2 data-astro-cid-4k3ngzmf>Preguntas Frecuentes</h2> <div class="faq-container" data-astro-cid-4k3ngzmf> ', " </div> </section> "])), unescapeHTML(JSON.stringify(schemaFAQ)), maybeRenderHead(), preguntas.map((item) => renderTemplate`<details data-astro-cid-4k3ngzmf> <summary data-astro-cid-4k3ngzmf>${item.pregunta}</summary> <p data-astro-cid-4k3ngzmf>${item.respuesta}</p> </details>`));
}, "C:/PROYECTOS/quilla-astro/src/components/Preguntas.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "titulo": "Inicio", "data-astro-cid-j7pv25f6": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="hero" data-astro-cid-j7pv25f6> <h1 data-astro-cid-j7pv25f6>⚡ Soluciones Eléctricas en Arequipa</h1> <p class="subtitulo" data-astro-cid-j7pv25f6>
Especialistas en Pozos a Tierra, Certificaciones INDECI y Emergencias 24/7.
            Protege tu negocio y familia hoy mismo.
</p> <div class="botones" data-astro-cid-j7pv25f6> <a href="/contacto" class="btn-primary" data-astro-cid-j7pv25f6>Solicitar Cotización</a> <a href="/servicios" class="btn-secondary" data-astro-cid-j7pv25f6>Ver Servicios</a> </div> </div> <hr class="divisor" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "Beneficios", $$Beneficios, { "data-astro-cid-j7pv25f6": true })} ${renderComponent($$result2, "Galeria", $$Galeria, { "data-astro-cid-j7pv25f6": true })}${renderComponent($$result2, "Preguntas", $$Preguntas, { "data-astro-cid-j7pv25f6": true })} ` })} `;
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
