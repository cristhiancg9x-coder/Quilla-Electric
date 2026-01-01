/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				brand: {
					black: '#0f172a',   // Texto principal (Slate 900)
					dark: '#334155',    // Texto secundario
					gray: '#f8fafc',    // Fondo base (Slate 50)
					accent: '#f59e0b',  // Ámbar (Energía/Rayo)
					orange: '#ea580c',  // Naranja (Hover/Acción)
				}
			},
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'], 
			},
			boxShadow: {
				'glass': '0 8px 32px 0 rgba(15, 23, 42, 0.05)', // Sombra suave para cristal
			},
            animation: {
                'blob': 'blob 10s infinite',
            },
            keyframes: {
                blob: {
                    '0%': { transform: 'translate(0px, 0px) scale(1)' },
                    '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
                    '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
                    '100%': { transform: 'translate(0px, 0px) scale(1)' },
                }
            }
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
	],
}