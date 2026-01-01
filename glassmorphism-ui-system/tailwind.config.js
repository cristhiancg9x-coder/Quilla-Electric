/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#0f172a',   // Texto principal (Slate 900)
          dark: '#334155',    // Texto secundario
          gray: '#f8fafc',    // Fondo base (Slate 50)
          accent: '#f59e0b',  // Ámbar (Energía/Rayo)
          orange: '#ea580c',  // Naranja (Hover/Acción)
        },
        glass: {
          white: 'rgba(255, 255, 255, 0.1)',
          light: 'rgba(255, 255, 255, 0.25)',
          medium: 'rgba(255, 255, 255, 0.4)',
          strong: 'rgba(255, 255, 255, 0.6)',
          dark: 'rgba(15, 23, 42, 0.1)',
          darkMedium: 'rgba(15, 23, 42, 0.3)',
          darkStrong: 'rgba(15, 23, 42, 0.5)',
        },
        gradient: {
          electric: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)',
          electricReverse: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)',
          glass: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
          glassDark: 'linear-gradient(135deg, rgba(15, 23, 42, 0.1) 0%, rgba(15, 23, 42, 0.05) 100%)',
          hero: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'], 
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(15, 23, 42, 0.05)',
        glassStrong: '0 8px 32px 0 rgba(15, 23, 42, 0.1)',
        glassColored: '0 8px 32px 0 rgba(245, 158, 11, 0.15)',
        glow: '0 0 20px rgba(245, 158, 11, 0.3)',
        glowStrong: '0 0 40px rgba(245, 158, 11, 0.5)',
        inner: 'inset 0 2px 4px 0 rgba(255, 255, 255, 0.1)',
      },
      backdropBlur: {
        xs: '2px',
        glass: '8px',
        strong: '16px',
      },
      animation: {
        blob: 'blob 10s infinite',
        float: 'float 6s ease-in-out infinite',
        pulseGlow: 'pulseGlow 3s ease-in-out infinite',
        slideIn: 'slideIn 0.5s ease-out',
        fadeIn: 'fadeIn 0.6s ease-out',
        scaleIn: 'scaleIn 0.4s ease-out',
        shimmer: 'shimmer 2s linear infinite',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(245, 158, 11, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(245, 158, 11, 0.6)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
  ],
}