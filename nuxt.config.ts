// https://nuxt.com/docs/api/configuration/nuxt-config
import glsl from 'vite-plugin-glsl'
export default defineNuxtConfig({
  css: ['~/assets/styles/global.scss'],
	modules: [
		'@pinia/nuxt',
		'@nuxtjs/apollo',
		'@vueuse/nuxt',
		'@nuxtjs/tailwindcss',
	],
  tailwindcss: {
    cssPath: '~/assets/styles/tailwind.scss',
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
  vite: {
    plugins: [glsl({watch: false})],
  }
})
