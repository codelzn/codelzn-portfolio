// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	srcDir: 'src',
	modules: [
		'@pinia/nuxt',
		'@nuxtjs/apollo',
		'@vueuse/nuxt',
		'@nuxtjs/tailwindcss',
	],
  tailwindcss: {
    configPath: '~~/tailwind.config.js',
		viewer: false,
	},
	apollo: {
		clients: {
			default: {
				httpEndpoint:
					'https://api-ap-northeast-1.hygraph.com/v2/clbcz9cnp1cl701t97a9z3lxm/master',
			},
		},
	},
	typescript: {
		tsConfig: {
			compilerOptions: {
				strict: true,
			},
		},
	},
})
