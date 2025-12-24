/* empty css                                    */
import { b as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, f as addAttribute } from '../../chunks/astro/server_rXIhwjdR.mjs';
import { $ as $$MainLayout } from '../../chunks/MainLayout_CFd2u93S.mjs';
/* empty css                                      */
export { renderers } from '../../renderers.mjs';

// src/data/zonas.js
const zonas = [
  {
    slug: "cerro-colorado",
    nombre: "Cerro Colorado",
    titulo: "Electricista en Cerro Colorado",
    desc: "Atención inmediata en Cono Norte, Ciudad Municipal y zonas residenciales. Llegamos en 30 minutos.",
  },
  {
    slug: "cayma",
    nombre: "Cayma",
    titulo: "Electricista en Cayma",
    desc: "Servicio exclusivo para residencias y negocios en Cayma. Expertos en acabados y seguridad.",
  },
  {
    slug: "yanahuara",
    nombre: "Yanahuara",
    titulo: "Electricista en Yanahuara",
    desc: "Mantenimiento eléctrico respetando la estética de tu hogar en la zona tradicional y moderna.",
  },
  {
    slug: "arequipa-cercado",
    nombre: "Cercado de Arequipa",
    titulo: "Electricista en el Cercado",
    desc: "Atención a oficinas y comercios del centro. Emitimos factura y certificado INDECI.",
  },
  {
    slug: "jlbyr",
    nombre: "José Luis Bustamante y Rivero",
    titulo: "Electricista en J.L.B. y Rivero",
    desc: "Servicio técnico garantizado cerca a la plataforma y zonas urbanas.",
  },
  {
    slug: "sachaca",
    nombre: "Sachaca",
    titulo: "Electricista en Sachaca",
    desc: "Instalaciones seguras para casas de campo y zonas residenciales.",
  }
];

const $$Astro = createAstro("https://quillaelectric.site");
function getStaticPaths() {
  return zonas.map((zona) => ({
    params: { lugar: zona.slug },
    props: { zona }
  }));
}
const $$lugar = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$lugar;
  const { zona } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "titulo": `${zona.titulo} | Emergencias 24h`, "descripcion": `\xBFBuscas ${zona.titulo}? ${zona.desc} T\xE9cnico Juan Quilla a tu servicio.`, "data-astro-cid-kcpmdgb3": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="zona-hero" data-astro-cid-kcpmdgb3> <h1 data-astro-cid-kcpmdgb3>⚡ ${zona.titulo}</h1> <p class="bajada" data-astro-cid-kcpmdgb3>${zona.desc}</p> <div class="caja-urgencia" data-astro-cid-kcpmdgb3> <p data-astro-cid-kcpmdgb3>🚨 <strong data-astro-cid-kcpmdgb3>¿Estás en ${zona.nombre} y se fue la luz?</strong></p> <p data-astro-cid-kcpmdgb3>Estamos cerca de tu zona. Atendemos emergencias las 24 horas.</p> <a${addAttribute(`https://wa.me/51999999999?text=Hola,%20necesito%20un%20electricista%20en%20${zona.nombre}`, "href")} class="btn-whatsapp" target="_blank" data-astro-cid-kcpmdgb3>
Pedir Técnico en ${zona.nombre} </a> </div> </section> <section class="contenido-zona" data-astro-cid-kcpmdgb3> <h2 data-astro-cid-kcpmdgb3>Servicios disponibles en ${zona.nombre}</h2> <ul data-astro-cid-kcpmdgb3> <li data-astro-cid-kcpmdgb3>✅ Reparación de Cortocircuitos y Apagones.</li> <li data-astro-cid-kcpmdgb3>✅ Instalación de Duchas Eléctricas (Rapiduchas).</li> <li data-astro-cid-kcpmdgb3>✅ Mantenimiento de Pozo a Tierra (Certificado).</li> <li data-astro-cid-kcpmdgb3>✅ Cableado de casas y departamentos.</li> </ul> <h3 data-astro-cid-kcpmdgb3>¿Por qué elegirnos en ${zona.nombre}?</h3> <p data-astro-cid-kcpmdgb3>
Conocemos los problemas eléctricos típicos de <strong data-astro-cid-kcpmdgb3>${zona.nombre}</strong>. 
      No cobramos viáticos excesivos porque estamos en la zona. 
      Garantía y puntualidad.
</p> </section> ` })} `;
}, "C:/PROYECTOS/quilla-astro/src/pages/electricista-en/[lugar].astro", void 0);

const $$file = "C:/PROYECTOS/quilla-astro/src/pages/electricista-en/[lugar].astro";
const $$url = "/electricista-en/[lugar]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$lugar,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
