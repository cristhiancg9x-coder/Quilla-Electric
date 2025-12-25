/** @type {import('tailwindcss').Config} */
export default {
	content: [
        './src/pages/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
        './src/components/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
        './src/modules/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}', // 👈 ¡ESTA ES LA CLAVE!
    ],
	theme: {
		extend: {},
	},
	plugins: [],
}