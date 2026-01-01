# Glassmorphism UI System for Quilla Electric

A comprehensive glassmorphism design system with animations for the Quilla Electric website migration from Astro to Next.js.

## Features

- 🎨 **Glassmorphism Effects**: Modern glass-like UI with backdrop blur and transparency
- ✨ **Smooth Animations**: Framer Motion powered animations for all components
- 🎯 **Brand Consistency**: Maintains Quilla Electric's slate-900 and amber-500 color scheme
- 📱 **Responsive Design**: Mobile-first approach with adaptive glass effects
- ⚡ **Performance Optimized**: GPU-accelerated animations and reduced motion support
- ♿ **Accessibility**: WCAG compliant with reduced motion preferences

## Installation

```bash
npm install framer-motion tailwindcss-animate
```

## Setup

### 1. Tailwind Configuration

Replace your `tailwind.config.js` with the provided configuration:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      // ... (copy from glassmorphism-ui-system/tailwind.config.js)
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
  ],
}
```

### 2. CSS Utilities

Add the glassmorphism CSS utilities to your global CSS file:

```css
@import './glassmorphism-ui-system/glassmorphism.css';
```

### 3. Component Imports

Import components in your Next.js pages:

```jsx
import {
  GlassNavigation,
  GlassHero,
  GlassServiceCard,
  GlassBenefitsGrid,
  GlassContactForm,
  GlassFooter
} from '../glassmorphism-ui-system/components';
```

## Component Usage

### Navigation

```jsx
<GlassNavigation />
```

### Hero Section

```jsx
<GlassHero />
```

### Service Cards

```jsx
<GlassServiceCard
  icon="⚡"
  title="Pozos a Tierra"
  description="Instalación y certificación de pozos a tierra según normas INDECI"
  href="/servicios/pozos-a-tierra"
  delay={0.1}
/>
```

### Benefits Grid

```jsx
<GlassBenefitsGrid />
```

### Contact Form

```jsx
<GlassContactForm />
```

### Footer

```jsx
<GlassFooter />
```

## Animation System

### Available Animations

- `cardVariants`: For service cards and interactive elements
- `fadeInUp`: General content fade-in animation
- `slideInLeft/Right`: Side panel animations
- `scaleIn`: Modal and popup animations
- `heroText`: Hero section text animations
- `navItem`: Navigation item animations

### Animation Components

```jsx
import {
  GlassCard,
  AnimatedContainer,
  StaggerGrid,
  PageTransition,
  ModalAnimation,
  FloatingAnimation,
  PulseGlow,
  ShimmerLoading
} from '../glassmorphism-ui-system/animations';
```

### Custom Animation Example

```jsx
import { motion } from 'framer-motion';
import { cardVariants } from '../glassmorphism-ui-system/animations';

<motion.div
  variants={cardVariants}
  initial="initial"
  animate="animate"
  whileHover="hover"
  className="glass-card"
>
  Your content here
</motion.div>
```

## Glassmorphism Classes

### Base Effects

- `.glass`: Basic glass effect
- `.glass-light`: Lighter glass effect
- `.glass-medium`: Medium glass effect
- `.glass-dark`: Dark glass effect

### Component Classes

- `.glass-card`: Glass card with hover effects
- `.glass-card-accent`: Glass card with brand accent
- `.glass-nav`: Glass navigation bar
- `.glass-btn`: Glass button
- `.glass-btn-primary/secondary`: Glass button variants
- `.glass-input`: Glass form input
- `.glass-modal`: Glass modal container

### Responsive Classes

All glass components are responsive and adapt to different screen sizes automatically.

## Color Scheme

### Brand Colors

- `brand-black`: #0f172a (Slate 900)
- `brand-dark`: #334155 (Slate 600)
- `brand-gray`: #f8fafc (Slate 50)
- `brand-accent`: #f59e0b (Amber 500)
- `brand-orange`: #ea580c (Orange 600)

### Glass Colors

- `glass-white`: rgba(255, 255, 255, 0.1)
- `glass-light`: rgba(255, 255, 255, 0.25)
- `glass-medium`: rgba(255, 255, 255, 0.4)
- `glass-dark`: rgba(15, 23, 42, 0.1)

### Gradients

- `gradient-electric`: Brand gradient
- `gradient-glass`: Glass effect gradient
- `gradient-hero`: Hero section gradient

## Performance Optimization

### GPU Acceleration

All animations use `transform: translateZ(0)` and `will-change: transform` for GPU acceleration.

### Reduced Motion

The system respects `prefers-reduced-motion` and disables animations for users who prefer reduced motion.

### Lazy Loading

Components support staggered animations to improve initial page load performance.

## Browser Support

- Chrome 76+
- Firefox 72+
- Safari 14+
- Edge 79+

## Migration Guide

### From Astro Components

1. Replace `.astro` components with `.tsx` React components
2. Convert Astro props to React props with TypeScript interfaces
3. Replace Astro `<style>` blocks with Tailwind classes
4. Add Framer Motion animations to static components

### Example Migration

**Before (Astro):**
```astro
<div class="item-beneficio">
  <span class="icono">⚡</span>
  <h3>Atención Rápida</h3>
</div>

<style>
  .item-beneficio {
    padding: 20px;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    transition: transform 0.3s;
  }
</style>
```

**After (Next.js):**
```jsx
<GlassCard delay={0.1}>
  <motion.div whileHover={{ scale: 1.2 }} className="text-4xl mb-4">
    ⚡
  </motion.div>
  <h3 className="text-xl font-bold text-brand-black mb-3">
    Atención Rápida
  </h3>
</GlassCard>
```

## Customization

### Adding New Glass Effects

```css
.glass-custom {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.25);
}
```

### Custom Animation Variants

```jsx
export const customVariant = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5 }
};
```

## Best Practices

1. **Use glass effects sparingly** - Too much glass can reduce readability
2. **Maintain contrast ratios** - Ensure text remains readable on glass backgrounds
3. **Test on real devices** - Glass effects can vary across devices
4. **Consider performance** - Use `will-change` only when necessary
5. **Provide fallbacks** - Ensure content is accessible without blur effects

## Troubleshooting

### Common Issues

1. **Blur not working**: Add `-webkit-backdrop-filter: blur(8px)` for Safari
2. **Performance issues**: Reduce the number of glass elements on screen
3. **Text readability**: Increase background opacity or use stronger text shadows
4. **Mobile responsiveness**: Test glass effects on actual mobile devices

### Debug Tools

- Use Chrome DevTools Performance panel to analyze animation performance
- Test with reduced motion settings to ensure accessibility
- Validate contrast ratios with color blindness simulators