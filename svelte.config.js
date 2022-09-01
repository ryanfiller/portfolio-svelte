import adapterNetlify from '@sveltejs/adapter-netlify'
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
		adapter: process.env.ADAPTER === 'static'
			? adapterStatic({
				pages: 'build',
				assets: 'build',
				fallback: '404.html'
			})
			: adapterNetlify({
				fallback: '404.html'
			}),
		appDir: '_app',
		files: {
			assets: 'static',
			routes: 'src/routes',
			// serviceWorker: 'src/service-worker',
			appTemplate: 'src/app.html'
		},
		trailingSlash: 'never'
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
