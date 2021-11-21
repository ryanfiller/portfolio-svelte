import dotenv from 'dotenv'
dotenv.config()

// import adapterNetlify from '@sveltejs/adapter-netlify'
import adapterStatic from '@sveltejs/adapter-static'

import replace from '@rollup/plugin-replace'
import copy from 'rollup-plugin-copy'
import dynamicImportVars from '@rollup/plugin-dynamic-import-vars'
import { default as svelteSVG } from '@poppanator/sveltekit-svg'

import sveltePreprocess from 'svelte-preprocess'
import autoprefixer from 'autoprefixer'
import nesting from 'postcss-nesting'
import customMedia from 'postcss-custom-media'

import mdsvexDefault from 'mdsvex'
const { mdsvex } = mdsvexDefault

import remarkPlugins from './src/lib/plugins/remark/index.js'
import rehypePlugins from './src/lib/plugins/rehype/index.js'

const config = {
	extensions: [
		'.svelte',
		'.md',
		'.svg'
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
			hooks: 'src/hooks',
			lib: 'src/lib',
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
			plugins: [
				replace({
					exclude: ['src/routes/**/_content/*.md'],
					preventAssignment: true,
					values: {
						'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
						'process.env.PORT': process.env.PORT || '3000',
						'process.env.CLOUDINARY_CLOUD': JSON.stringify(process.env.CLOUDINARY_CLOUD),
						// https://docs.netlify.com/configure-builds/environment-variables/#read-only-variables
						'process.env.CONTEXT': JSON.stringify(process.env.CONTEXT),
						'process.env.NETLIFY_URL': process.env.CONTEXT !== 'production'
							? JSON.stringify(process.env.DEPLOY_URL)
							: JSON.stringify(process.env.URL)
					}
				}),
				copy({
					targets: [
						{ 
							src: 'src/**/_images/*.*',
							dest: 'static/images'
						}
					],
					hook: 'buildStart'
				}),
				dynamicImportVars.default({
					include: [
						'src/routes/**/*.svelte',
						'src/routes/**/index.md'
					]
				}),
				svelteSVG()
			]
		}
	},

	preprocess: [
		sveltePreprocess({
			defaults: { style: 'postcss' },
			postcss: {
				plugins: [
					autoprefixer,
					nesting,
					customMedia({
						importFrom: [
							'src/styles/custom-media.css'
						]
					})
				]
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

export default config
