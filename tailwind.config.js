/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		`components/**/*.{vue,js,ts}`,
		`layouts/**/*.vue`,
		`pages/**/*.vue`,
		`composables/**/*.{js,ts}`,
		`plugins/**/*.{js,ts}`,
		`App.{js,ts,vue}`,
		`app.{js,ts,vue}`,
		`Error.{js,ts,vue}`,
		`error.{js,ts,vue}`,
	],
	theme: {
    extend: {
      colors: {
        'my-color': '#ffff00'
      }
		},
	},
	plugins: [
		require('@tailwindcss/forms'),
		require('@tailwindcss/typography'),
		require('@tailwindcss/line-clamp'),
		require('@tailwindcss/aspect-ratio'),
	],
}
