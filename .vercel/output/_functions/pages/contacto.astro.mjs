import { c as createComponent, r as renderComponent, g as renderScript, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DjG7uRHx.mjs';
import { $ as $$MainLayout } from '../chunks/MainLayout_CUJTzj17.mjs';
/* empty css                                    */
export { renderers } from '../renderers.mjs';

const $$Contacto = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "titulo": "Contacto", "descripcion": "Contacta con Quilla Electric para emergencias o cotizaciones de pozos a tierra en Arequipa.", "data-astro-cid-2mxdoeuz": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-900/20 blur-[120px] rounded-full -z-10 pointer-events-none" data-astro-cid-2mxdoeuz></div> <div class="absolute bottom-0 left-0 w-[600px] h-[600px] bg-green-900/10 blur-[120px] rounded-full -z-10 pointer-events-none" data-astro-cid-2mxdoeuz></div> <section class="py-12 md:py-20 px-4 animate-fade-in-down" data-astro-cid-2mxdoeuz> <div class="text-center mb-12" data-astro-cid-2mxdoeuz> <span class="inline-block py-1 px-3 rounded-full bg-green-500/10 border border-green-400/20 text-green-300 text-xs font-bold tracking-wider mb-4 uppercase" data-astro-cid-2mxdoeuz>
Soporte & Ventas
</span> <h1 class="text-4xl md:text-5xl font-extrabold mb-4 text-white" data-astro-cid-2mxdoeuz>
Hablemos de tu <span class="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500" data-astro-cid-2mxdoeuz>Proyecto</span> </h1> <p class="text-slate-300 text-lg max-w-xl mx-auto" data-astro-cid-2mxdoeuz>
Estamos listos para atender tu emergencia eléctrica o diseñar tu solución.
</p> </div> <div class="contenedor-contacto max-w-4xl mx-auto" data-astro-cid-2mxdoeuz> <div class="glass-panel info-box group" data-astro-cid-2mxdoeuz> <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-2" data-astro-cid-2mxdoeuz> <span class="text-blue-400" data-astro-cid-2mxdoeuz>⚡</span> Información Directa
</h2> <div class="space-y-4 text-slate-300" data-astro-cid-2mxdoeuz> <p class="flex items-center gap-3" data-astro-cid-2mxdoeuz> <span class="p-2 bg-blue-500/10 rounded-lg text-xl" data-astro-cid-2mxdoeuz>📍</span> <span data-astro-cid-2mxdoeuz><strong data-astro-cid-2mxdoeuz>Ubicación:</strong> Cerro Colorado, Arequipa</span> </p> <p class="flex items-center gap-3" data-astro-cid-2mxdoeuz> <span class="p-2 bg-blue-500/10 rounded-lg text-xl" data-astro-cid-2mxdoeuz>📧</span> <span data-astro-cid-2mxdoeuz><strong data-astro-cid-2mxdoeuz>Correo:</strong> quillaelectriccyt@gmail.com</span> </p> <p class="flex items-center gap-3" data-astro-cid-2mxdoeuz> <span class="p-2 bg-blue-500/10 rounded-lg text-xl" data-astro-cid-2mxdoeuz>⏰</span> <span data-astro-cid-2mxdoeuz><strong data-astro-cid-2mxdoeuz>Horario:</strong> Lunes a Sábado, 8am - 6pm</span> </p> </div> <div class="nota-urgente mt-8 p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 font-bold text-center group-hover:border-red-500/50 transition-all" data-astro-cid-2mxdoeuz> <p class="flex items-center justify-center gap-2 animate-pulse" data-astro-cid-2mxdoeuz> <span data-astro-cid-2mxdoeuz>⚠️</span> ¿Emergencia? Llámanos directamente.
</p> </div> </div> <form class="glass-panel formulario group" id="form-whatsapp" data-astro-cid-2mxdoeuz> <h2 class="text-2xl font-bold text-white mb-2 flex items-center gap-2" data-astro-cid-2mxdoeuz> <span class="text-green-400" data-astro-cid-2mxdoeuz>📲</span> Cotiza por WhatsApp
</h2> <p class="text-slate-400 text-sm mb-6" data-astro-cid-2mxdoeuz>
Llena tus datos y te responderemos al instante.
</p> <div class="space-y-4" data-astro-cid-2mxdoeuz> <label class="block" data-astro-cid-2mxdoeuz> <span class="text-slate-300 font-medium" data-astro-cid-2mxdoeuz>Nombre:</span> <input type="text" id="nombre" name="nombre" placeholder="Ej: Juan Pérez" required class="input-neon" data-astro-cid-2mxdoeuz> </label> <label class="block" data-astro-cid-2mxdoeuz> <span class="text-slate-300 font-medium" data-astro-cid-2mxdoeuz>Servicio de interés:</span> <select id="servicio" name="servicio" class="input-neon" data-astro-cid-2mxdoeuz> <option value="Mantenimiento Pozo a Tierra" data-astro-cid-2mxdoeuz>Mantenimiento Pozo a Tierra</option> <option value="Instalación Domiciliaria" data-astro-cid-2mxdoeuz>Instalación Domiciliaria</option> <option value="Emergencia Eléctrica" data-astro-cid-2mxdoeuz>Emergencia Eléctrica</option> <option value="Otro" data-astro-cid-2mxdoeuz>Otro</option> </select> </label> <label class="block" data-astro-cid-2mxdoeuz> <span class="text-slate-300 font-medium" data-astro-cid-2mxdoeuz>Mensaje o Consulta:</span> <textarea id="mensaje" name="mensaje" rows="4" placeholder="Hola, necesito cotizar..." required class="input-neon resize-none" data-astro-cid-2mxdoeuz></textarea> </label> </div> <button type="submit" class="btn-whatsapp-neon mt-6 w-full" data-astro-cid-2mxdoeuz> <span data-astro-cid-2mxdoeuz>Enviar a WhatsApp</span> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-send" data-astro-cid-2mxdoeuz><line x1="22" y1="2" x2="11" y2="13" data-astro-cid-2mxdoeuz></line><polygon points="22 2 15 22 11 13 2 9 22 2" data-astro-cid-2mxdoeuz></polygon></svg> </button> </form> </div> </section> ` })} ${renderScript($$result, "C:/PROYECTOS/quilla-astro/src/pages/contacto.astro?astro&type=script&index=0&lang.ts")} `;
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
