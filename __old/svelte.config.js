import dotenv from 'dotenv'
dotenv.config()

// import adapterNetlify from '@sveltejs/adapter-netlify'
import adapterStatic from '@sveltejs/adapter-static'

import mdsvexDefault from 'mdsvex'
const { mdsvex } = mdsvexDefault

import vitePlugins from './src/plugins/vite.js'
import postcssPlugins from './src/plugins/postcss/index.js'
import remarkPlugins from './src/plugins/remark/index.js'
import rehypePlugins from './src/plugins/rehype/index.js'

const envVars = {
	'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
	'process.env.PORT': process.env.PORT || '3000',
	'process.env.CLOUDINARY_CLOUD': JSON.stringify(process.env.CLOUDINARY_CLOUD),
	// https://docs.netlify.com/configure-builds/environment-variables/#read-only-variables
	'process.env.CONTEXT': JSON.stringify(process.env.CONTEXT),
	'process.env.NETLIFY_URL': process.env.CONTEXT !== 'production'
		? JSON.stringify(process.env.DEPLOY_URL)
		: JSON.stringify(process.env.URL)
}

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
		amp: false,
    floc: false,
		appDir: '_app',
		files: {
			assets: 'static',
			routes: 'src/routes',
			// serviceWorker: 'src/service-worker',
			template: 'src/app.html'
		},
		hydrate: true,
		prerender: {
			crawl: true,
			enabled: true,
			force: true,
			pages: ['*', '/404', '/robots.txt']
		},
		router: true,
		ssr: true,
		trailingSlash: 'never',
		vite: {
			plugins: vitePlugins(envVars)
		}
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
		mdsvex({
			extension: '.md',
			layout: {
				blog: 'src/layouts/blog.svelte',
				lab: 'src/layouts/lab.svelte',
				styles: 'src/routes/styles/_examples/layout.svelte',
				_: 'src/layouts/markdown.svelte'
			},
			highlight: false, // use remark plugin instead
			remarkPlugins: [...Object.values(remarkPlugins)],
			rehypePlugins: [...Object.values(rehypePlugins)]
		})
	]	
}
