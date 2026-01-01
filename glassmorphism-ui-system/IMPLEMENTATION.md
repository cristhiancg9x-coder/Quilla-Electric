# Glassmorphism UI System Implementation Guide

## Quick Start for Next.js Migration

### 1. Install Dependencies

```bash
npm install framer-motion tailwindcss-animate
# or
yarn add framer-motion tailwindcss-animate
# or
pnpm add framer-motion tailwindcss-animate
```

### 2. Update Tailwind Configuration

Copy the provided `tailwind.config.js` to your Next.js project root. This includes:
- Extended color palette with brand colors
- Glass effect utilities
- Custom animations and keyframes
- Responsive design utilities

### 3. Add CSS to Global Styles

In your `src/app/globals.css` (or `styles/globals.css`):

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Import glassmorphism utilities */
@import '../glassmorphism-ui-system/glassmorphism.css';

/* Additional global styles */
:root {
  --glass-blur: 8px;
  --glass-opacity: 0.1;
}

body {
  @apply bg-gradient-to-br from-brand-gray to-white;
  font-family: 'Inter', system-ui, sans-serif;
}
```

### 4. Create Layout Component

Update your `src/app/layout.tsx`:

```tsx
import { GlassNavigation, GlassFooter } from '../glassmorphism-ui-system/components';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-PE">
      <head>
        <title>Quilla Electric - Soluciones Eléctricas</title>
        <meta name="description" content="Servicios eléctricos profesionales en Arequipa" />
        <link rel="icon" href="/favicon.svg" />
      </head>
      <body>
        <GlassNavigation />
        <main>{children}</main>
        <GlassFooter />
      </body>
    </html>
  );
}
```

### 5. Update Home Page

Replace your `src/app/page.tsx`:

```tsx
import { 
  GlassHero, 
  GlassServiceCard, 
  GlassBenefitsGrid 
} from '../glassmorphism-ui-system/components';
import { PageTransition, StaggerGrid } from '../glassmorphism-ui-system/animations';

const services = [
  {
    icon: '🏗️',
    title: 'Pozos a Tierra',
    description: 'Instalación y certificación según normas INDECI',
    href: '/servicios/pozos-a-tierra',
  },
  // ... other services
];

export default function HomePage() {
  return (
    <PageTransition>
      <GlassHero />
      
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <StaggerGrid cols={1} md:cols={2} lg:cols={3}>
            {services.map((service, index) => (
              <GlassServiceCard
                key={service.title}
                {...service}
                delay={index * 0.1}
              />
            ))}
          </StaggerGrid>
        </div>
      </section>
      
      <GlassBenefitsGrid />
    </PageTransition>
  );
}
```

## Migration Checklist

### ✅ Pre-Migration
- [ ] Backup current Astro project
- [ ] Install Next.js and required dependencies
- [ ] Set up TypeScript configuration
- [ ] Create new Next.js project structure

### ✅ Configuration
- [ ] Update Tailwind config with glassmorphism theme
- [ ] Add glassmorphism CSS utilities
- [ ] Configure Framer Motion
- [ ] Set up global styles

### ✅ Component Migration
- [ ] Convert Astro components to React/TypeScript
- [ ] Replace static styles with glassmorphism classes
- [ ] Add Framer Motion animations
- [ ] Update props interfaces

### ✅ Page Migration
- [ ] Convert `.astro` pages to `.tsx`
- [ ] Update page layouts
- [ ] Add metadata and SEO
- [ ] Implement responsive design

### ✅ Testing
- [ ] Test all glassmorphism effects
- [ ] Verify animations on different devices
- [ ] Check accessibility (reduced motion)
- [ ] Validate performance metrics

## Performance Optimization Tips

### 1. Animation Performance
```tsx
// Use GPU acceleration for smooth animations
const optimizedCard = {
  initial: { opacity: 0, transform: 'translateZ(0) scale(0.95)' },
  animate: { opacity: 1, transform: 'translateZ(0) scale(1)' },
  transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
};
```

### 2. Lazy Loading
```tsx
// Stagger animations for better performance
<StaggerGrid cols={3} staggerDelay={0.1}>
  {items.map((item, index) => (
    <GlassCard key={item.id} delay={index * 0.1}>
      {item.content}
    </GlassCard>
  ))}
</StaggerGrid>
```

### 3. Reduced Motion Support
```tsx
// Respect user preferences
const motionProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.3 }
};

// CSS handles reduced motion automatically
```

## Browser Compatibility

### Required CSS Support
- `backdrop-filter: blur()` - Chrome 76+, Safari 14+, Firefox 103+
- CSS custom properties - All modern browsers
- CSS Grid and Flexbox - All modern browsers

### Fallbacks for Older Browsers
```css
.glass {
  /* Fallback for browsers without backdrop-filter */
  background: rgba(255, 255, 255, 0.9);
  
  /* Modern browsers */
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
```

## Customization Examples

### Custom Glass Effect
```css
.glass-brand {
  background: linear-gradient(135deg, 
    rgba(245, 158, 11, 0.1) 0%, 
    rgba(15, 23, 42, 0.05) 100%
  );
  backdrop-filter: blur(12px);
  border: 1px solid rgba(245, 158, 11, 0.2);
}
```

### Custom Animation
```tsx
export const electricPulse = {
  initial: { scale: 1, boxShadow: '0 0 0 rgba(245, 158, 11, 0.4)' },
  animate: {
    scale: [1, 1.05, 1],
    boxShadow: [
      '0 0 0 rgba(245, 158, 11, 0.4)',
      '0 0 20px rgba(245, 158, 11, 0.6)',
      '0 0 0 rgba(245, 158, 11, 0.4)'
    ],
  },
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: 'easeInOut'
  }
};
```

## Troubleshooting

### Common Issues and Solutions

1. **Glass effect not visible**
   - Check backdrop-filter browser support
   - Ensure background has content/contrast
   - Verify z-index stacking

2. **Animations lagging**
   - Reduce number of simultaneous animations
   - Use `transform` instead of `position` changes
   - Add `will-change: transform` sparingly

3. **Mobile performance issues**
   - Reduce blur intensity on mobile
   - Use simpler animations on smaller screens
   - Test on actual mobile devices

4. **Text readability**
   - Increase text contrast
   - Add text shadows for better readability
   - Use stronger glass opacity for text containers

### Debug Tools
```bash
# Test performance
npm run build && npm run start

# Check bundle size
npm run analyze

# Lighthouse audit
npx lighthouse http://localhost:3000
```

## Next Steps

1. **Implement remaining pages** using the glassmorphism components
2. **Add micro-interactions** for enhanced user experience
3. **Optimize images and assets** for better performance
4. **Set up analytics and monitoring**
5. **Test across different devices and browsers**

## Support

For issues or questions about the glassmorphism UI system:
- Check the component documentation
- Review the examples in `example-pages.tsx`
- Test with the provided troubleshooting guide
- Ensure all dependencies are properly installed