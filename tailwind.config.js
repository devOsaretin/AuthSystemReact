/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		colors: {
			red: "#d82227",
			"new-grey": "#f2f6fc",
			"input-grey": "#FFFFFF",
			// 'input-grey': '#F2F2F2',
			grey: "#000000b3",
			"blue-grey": "#F2F2F7",
			"light-grey": "#F0F3F4",
			"middle-grey": "#394243",
			"dark-grey": "#8E8E93",
			error: "#B10B01",
			white: "#FFFFFF",
			black: "#111111",
		},
		fontFamily: {
			poppins: ["Poppins", "sans-serif"],
		},
		extend: {},
	},
	plugins: [],
};
