import { c as createComponent, r as renderComponent, g as renderScript, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DjG7uRHx.mjs';
import { $ as $$MainLayout } from '../chunks/MainLayout_CB30UFig.mjs';
/* empty css                                    */
export { renderers } from '../renderers.mjs';

const $$Contacto = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "titulo": "Contacto", "descripcion": "Contacta con Quilla Electric para emergencias o cotizaciones de pozos a tierra en Arequipa.", "data-astro-cid-2mxdoeuz": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 data-astro-cid-2mxdoeuz>📞 Contáctanos</h1> <p class="intro" data-astro-cid-2mxdoeuz>Estamos listos para atender tu emergencia eléctrica o proyecto.</p> <div class="contenedor-contacto" data-astro-cid-2mxdoeuz> <div class="info-box" data-astro-cid-2mxdoeuz> <h2 data-astro-cid-2mxdoeuz>Información Directa</h2> <p data-astro-cid-2mxdoeuz><strong data-astro-cid-2mxdoeuz>📍 Ubicación:</strong> Cerro Colorado, Arequipa</p> <p data-astro-cid-2mxdoeuz><strong data-astro-cid-2mxdoeuz>📧 Correo:</strong> quillaelectriccyt@gmail.com</p> <p data-astro-cid-2mxdoeuz><strong data-astro-cid-2mxdoeuz>⏰ Horario:</strong> Lunes a Sábado, 8am - 6pm</p> <div class="nota-urgente" data-astro-cid-2mxdoeuz> <p data-astro-cid-2mxdoeuz>⚠️ ¿Emergencia? Llámanos directamente.</p> </div> </div> <form class="formulario" id="form-whatsapp" data-astro-cid-2mxdoeuz> <h2 data-astro-cid-2mxdoeuz>Cotiza por WhatsApp</h2> <p style="font-size: 0.9rem; color: #666; margin-bottom: 1rem;" data-astro-cid-2mxdoeuz>
Llena tus datos y te responderemos al instante.
</p> <label data-astro-cid-2mxdoeuz>
Nombre:
<input type="text" id="nombre" name="nombre" placeholder="Ej: Juan Pérez" required data-astro-cid-2mxdoeuz> </label> <label data-astro-cid-2mxdoeuz>
Servicio de interés:
<select id="servicio" name="servicio" data-astro-cid-2mxdoeuz> <option value="Mantenimiento Pozo a Tierra" data-astro-cid-2mxdoeuz>Mantenimiento Pozo a Tierra</option> <option value="Instalación Domiciliaria" data-astro-cid-2mxdoeuz>Instalación Domiciliaria</option> <option value="Emergencia Eléctrica" data-astro-cid-2mxdoeuz>Emergencia Eléctrica</option> <option value="Otro" data-astro-cid-2mxdoeuz>Otro</option> </select> </label> <label data-astro-cid-2mxdoeuz>
Mensaje o Consulta:
<textarea id="mensaje" name="mensaje" rows="4" placeholder="Hola, necesito cotizar..." required data-astro-cid-2mxdoeuz></textarea> </label> <button type="submit" data-astro-cid-2mxdoeuz>
📲 Enviar a WhatsApp
</button> </form> </div> ` })} ${renderScript($$result, "C:/PROYECTOS/quilla-astro/src/pages/contacto.astro?astro&type=script&index=0&lang.ts")} `;
}, "C:/PROYECTOS/quilla-astro/src/pages/contacto.astro", void 0);

const $$file = "C:/PROYECTOS/quilla-astro/src/pages/contacto.astro";
const $$url = "/contacto";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Contacto,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
