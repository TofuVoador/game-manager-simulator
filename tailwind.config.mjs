/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
			},
			fontFamily: {
				comfortaa: ["var(--font-comfortaa)"],
				sanches: ["var(--font-sanches)"],
				spaceMono: ["var(--font-space-mono)"],
			},
		},
	},
	plugins: [],
};
