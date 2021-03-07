import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import commonjs from '@rollup/plugin-commonjs'
import svelte from 'rollup-plugin-svelte'
import { terser } from 'rollup-plugin-terser'
import config from 'sapper/config/rollup.js'
import pkg from './package.json'
import { mdsvex } from 'mdsvex'
import dynamicImportVars from '@rollup/plugin-dynamic-import-vars'
import svelteSVG from 'rollup-plugin-svelte-svg'
import { globalStyle, scss } from 'svelte-preprocess'
import copy from 'rollup-plugin-copy'
require('dotenv').config()

import attr from 'remark-attr'
import remarkCustomBlocks from 'remark-custom-blocks'
// TODO remark-abbr
// TODO https://github.com/JS-DevTools/rehype-toc

// custom plugins
import blockquote from './plugins/remark/blockquote'
import headings from './plugins/remark/headings'
import images from './plugins/remark/images'
import links from './plugins/remark/links'
// import video from './plugins/remark/video' // only called from image component for now...
import embed from './plugins/rehype/embed'
import twitter from './plugins/rehype/twitter'

const mode = process.env.NODE_ENV
const dev = mode === 'development'

// https://docs.netlify.com/configure-builds/environment-variables/#read-only-variables
let netlifyUrl = ''
if (process.env.CONTEXT !== 'production') {
	netlifyUrl = process.env.DEPLOY_URL
} else {
	netlifyUrl = process.env.URL
}

const envVars = {
	'process.env.NODE_ENV': JSON.stringify(mode),
	'process.env.NETLIFY_URL': JSON.stringify(netlifyUrl),
	'process.env.CLOUDINARY_CLOUD': JSON.stringify(process.env.CLOUDINARY_CLOUD),
	exclude: 'src/routes/**/*.md'
}

const dynamicImportVarsOptions = {
	include: `src/routes/**/*.svelte`
}

const preprocess = [
	mdsvex({
		extension: '.md',
		layout: {
			blog: 'src/layouts/blog.svelte',
			lab: 'src/layouts/lab.svelte',
			_: 'src/layouts/markdown.svelte',
		},
		remarkPlugins: [
			[attr, { scope: 'every' }],
			[remarkCustomBlocks, {
				details: {
					classes: 'details',
					title: 'required',
					details: true
				},
				clearfix: {
					classes: 'clearfix'
				}
			}],
			blockquote,
			headings,
			images,
			links,
			// video
		],
		rehypePlugins: [
			embed,
			twitter
		],
	}),
	scss(),
	globalStyle()
]

const onwarn = (warning, onwarn) =>
	(warning.code === 'MISSING_EXPORT' && /'preload'/.test(warning.message)) ||
	(warning.code === 'CIRCULAR_DEPENDENCY' && /[/\\]@sapper[/\\]/.test(warning.message)) ||
	onwarn(warning);

export default {
	client: {
		input: config.client.input(),
		output: config.client.output(),
		plugins: [
			replace({
				'process.browser': true,
				...envVars
			}),
			svelte({
				dev,
				hydratable: true,
				emitCss: true,
				extensions: ['.svelte', '.md'],
				preprocess
			}),
			resolve({
				browser: true,
				dedupe: ['svelte']
			}),
			commonjs(),
			dynamicImportVars(dynamicImportVarsOptions),
			svelteSVG({ dev }),
			copy({
				targets: [
					// dunno why, but this breaks the server.js process if its `_images`
					{ src: 'src/**/images/*.*', dest: 'static/images' }
				]
			}),
			!dev && terser({
				module: true
			})
		],

		preserveEntrySignatures: false,
		onwarn,
	},

	server: {
		input: config.server.input(),
		output: config.server.output(),
		plugins: [
			replace({
				'process.browser': false,
				...envVars
			}),
			svelte({
				dev,
				generate: 'ssr',
				hydratable: true,
				extensions: ['.svelte', '.md'],
				preprocess
			}),
			resolve({
				dedupe: ['svelte']
			}),
			commonjs(),
			dynamicImportVars(dynamicImportVarsOptions),
			svelteSVG({ generate: 'ssr', dev }),
			copy({
				targets: [
					{ src: 'src/**/_images/*.*', dest: 'static/images' }
				]
			})
		],
		external: Object.keys(pkg.dependencies).concat(
			require('module').builtinModules || Object.keys(process.binding('natives'))
		),

		preserveEntrySignatures: 'strict',
		onwarn,
	},

	// serviceworker: {
	// 	input: config.serviceworker.input(),
	// 	output: config.serviceworker.output(),
	// 	plugins: [
	// 		resolve(),
	// 		replace({
	// 			'process.browser': true,
	// 			...envVars
	// 		}),
	// 		commonjs(),
	// 		!dev && terser()
	// 	],

	// 	preserveEntrySignatures: false,
	// 	onwarn,
	// }
}
