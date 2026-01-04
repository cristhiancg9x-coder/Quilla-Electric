# ⚡ Quilla Electric - Sitio Web Astro

Sitio web corporativo desarrollado con [Astro](https://astro.build) para **Quilla Electric**, empresa de servicios eléctricos en Arequipa.

El proyecto está optimizado para velocidad, SEO local y experiencia de usuario (UI/UX) con diseño moderno (Glassmorphism).

## 📋 Requisitos Previos

- **Node.js**: v18.14.1 o superior.
- **Gestor de paquetes**: npm, pnpm (recomendado) o yarn.

## 🚀 Instalación y Desarrollo

1. **Clonar el repositorio:**

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd quilla-astro
   ```

2. **Instalar dependencias:**

   ```bash
   npm install
   # o
   pnpm install
   ```

3. **Iniciar servidor de desarrollo:**

   ```bash
   npm run dev
   ```
   El sitio estará disponible en `http://localhost:4321`.

## 🛠️ Comandos Disponibles

| Comando | Acción |
| :--- | :--- |
| `npm run dev` | Inicia el servidor de desarrollo local con recarga en caliente. |
| `npm run build` | Compila el sitio para producción en la carpeta `./dist/`. |
| `npm run preview` | Vista previa local de la versión de producción compilada. |
| `npm run astro ...` | Ejecuta comandos del CLI de Astro (ej. `astro check`). |

## 📂 Estructura del Proyecto

```text
/
├── public/               # Archivos estáticos (imágenes, favicon, robots.txt)
├── src/
│   ├── components/       # Componentes reutilizables (.astro)
│   │   ├── About.astro   # Sección "Quiénes Somos"
│   │   ├── Navbar.astro  # Barra de navegación
│   │   └── ...
│   ├── layouts/          # Plantillas de diseño base (MainLayout)
│   ├── pages/            # Rutas y páginas del sitio
│   │   ├── index.astro   # Página de inicio
│   │   ├── blog/         # Blog (Lista y Post individual)
│   │   ├── servicios/    # Servicios (Catálogo y Detalle)
│   │   └── electricista-en/ # Landing pages locales (SEO)
│   ├── content/          # Contenido Markdown (CMS local)
│   │   ├── blog/
│   │   └── servicios/
│   ├── data/             # Datos estáticos (ej. zonas de cobertura)
│   └── assets/           # Imágenes optimizadas por Astro
└── astro.config.mjs      # Configuración principal de Astro
```

## 🧩 Características Clave

- **Astro Components**: HTML templating sin JavaScript en tiempo de ejecución por defecto.
- **Content Collections**: Gestión de contenido (Blog/Servicios) con validación de tipos y esquemas (Zod).
- **Rutas Dinámicas**: Generación de páginas estáticas (SSG) para blog posts, servicios y zonas geográficas.
- **SEO & Performance**:
  - Imágenes optimizadas (`astro:assets`).
  - Sitemap automático (`@astrojs/sitemap`).
  - JSON-LD Schema estructurado.
- **Estilos**: Vannila CSS con variables CSS modernas y diseño Glassmorphism.

## 📝 Gestión de Contenido

Para agregar nuevo contenido, crea archivos Markdown (`.md`) en las carpetas correspondientes dentro de `src/content/`:

- **Blog**: `src/content/blog/titulo-post.md`
- **Servicios**: `src/content/servicios/nombre-servicio.md`

Asegúrate de seguir el esquema de Frontmatter definido en `src/content/config.ts`.
