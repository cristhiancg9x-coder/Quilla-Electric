# ⚡ Quilla Electric - Sitio Web Estático

Sitio web corporativo para **Quilla Electric**, empresa de servicios eléctricos en Arequipa. Este proyecto ha sido migrado de Astro a una arquitectura de **HTML, CSS y JavaScript puro** para maximizar el rendimiento y la simplicidad.

El proyecto está optimizado para velocidad, SEO local y experiencia de usuario (UI/UX) con un diseño moderno.

## 🚀 Desarrollo Local

No se requiere de ningún gestor de paquetes (npm/yarn). Simplemente abre el archivo `index.html` en tu navegador o usa una extensión como "Live Server" en VS Code.

## 🛠️ Estructura del Proyecto

```text
/
├── img/                  # Imágenes optimizadas (formato WebP)
├── scripts/              # Scripts de utilidad (ej. optimización de imágenes)
├── app.js                # Lógica de interacción en el cliente
├── index.html            # Estructura principal del sitio
├── style.css             # Estilos (Vanilla CSS)
├── robots.txt            # Configuración para buscadores
├── sitemap.xml           # Mapa del sitio para SEO
└── render.yaml           # Configuración para despliegue en Render.com
```

## 🌐 Despliegue en Render

El sitio está configurado para desplegarse automáticamente como un **Static Site** en Render.

1. Conecta este repositorio a un nuevo **Static Site** en Render.
2. Render detectará automáticamente el archivo `render.yaml`.
3. El despliegue se realizará sirviendo los archivos desde la raíz.

**Configuración manual (si es necesaria):**
- **Build Command**: (vacío)
- **Publish Directory**: `.`

## 🧩 Características Clave

- **Alto Rendimiento**: Carga instantánea al no depender de frameworks pesados.
- **Optimización de Imágenes**: Todas las imágenes en `img/` están en formato WebP para reducir el peso.
- **SEO Ready**: Incluye sitemap, robots.txt y metatags optimizados.
- **Diseño Glassmorphism**: Estética moderna y profesional.

---
© 2026 Quilla Electric - Arequipa, Perú.
