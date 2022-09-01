// import adapterNetlify from '@sveltejs/adapter-netlify'
import adapterStatic from '@sveltejs/adapter-static'

import sveltePreprocess from 'svelte-preprocess'

import mdsvexDefault from 'mdsvex'
const { mdsvex } = mdsvexDefault

import postcssPlugins from './src/plugins/postcss/index.js'
import remarkPlugins from './src/plugins/remark/index.js'
import rehypePlugins from './src/plugins/rehype/index.js'

export default {
	extensions: [
		'.svelte',
		'.md',
	],
	kit: {
		adapter: adapterStatic(),
		// adapter: process.env.ADAPTER === 'static'
		// 	? adapterStatic({
		// 		pages: 'build',
		// 		assets: 'build',
		// 		fallback: null
		// 		// fallback: '404.html'
		// 	})
		// 	: adapterNetlify(),
    // target: null,
		appDir: '_app',
		files: {
			assets: 'static',
			routes: 'src/routes',
			// serviceWorker: 'src/service-worker',
			template: 'src/app.html'
		},
		trailingSlash: 'never',
		browser: {
			hydrate: true,
			router: true,
		},
		prerender: {
			crawl: true,
			enabled: true,
			onError: 'continue',
			entries: ['*', '/404', '/robots.txt']
		},
		// vite: {
		// 	plugins: vitePlugins(envVars),
		// 	resolve: {
		// 		alias: {
		// 			$actions: path.resolve('./src/actions'),
		// 			$components: path.resolve('./src/components'),
		// 			$helpers: path.resolve('./src/helpers'),
		// 			$plugins: path.resolve('./src/plugins'),
		// 			$stores: path.resolve('./src/stores'),
		// 			$styles: path.resolve('./src/styles'),
		// 			$layouts: path.resolve('./src/layouts'),
		// 			'$site-config': path.resolve('./src/site-config.js')
		// 		}
		// 	}
		// }
	},

	preprocess: [
		sveltePreprocess({
			defaults: { 
				style: 'postcss',
				script: 'typescript'
			},
			postcss: {
				plugins: postcssPlugins
			}
		}),
		// mdsvex({
		// 	extension: '.md',
		// 	layout: {
		// 		blog: 'src/layouts/blog.svelte',
		// 		lab: 'src/layouts/lab.svelte',
		// 		styles: 'src/routes/styles/_examples/layout.svelte',
		// 		_: 'src/layouts/markdown.svelte'
		// 	},
		// 	highlight: false, // use remark plugin instead
		// 	remarkPlugins: [...Object.values(remarkPlugins)],
		// 	rehypePlugins: [...Object.values(rehypePlugins)]
		// })
	]	
}
