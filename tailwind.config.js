/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		`src/components/**/*.{vue,js,ts}`,
		`src/layouts/**/*.vue`,
		`src/pages/**/*.vue`,
		`src/composables/**/*.{js,ts}`,
		`src/plugins/**/*.{js,ts}`,
		`src/App.{js,ts,vue}`,
		`src/app.{js,ts,vue}`,
		`src/Error.{js,ts,vue}`,
		`src/error.{js,ts,vue}`,
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
