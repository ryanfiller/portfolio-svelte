import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import commonjs from '@rollup/plugin-commonjs'
import svelte from 'rollup-plugin-svelte'
import babel from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'
import config from 'sapper/config/rollup.js'
import pkg from './package.json'
import { mdsvex } from 'mdsvex'
import svelteSVG from "rollup-plugin-svelte-svg"
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
const legacy = !!process.env.SAPPER_LEGACY_BUILD

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
	'process.env.CLOUDINARY_CLOUD': JSON.stringify(process.env.CLOUDINARY_CLOUD)
}

const preprocess = [
	mdsvex({
		extension: '.md',
		layout: 'src/components/layout/mdsvex.svelte',
		remarkPlugins: [
			[attr, { scope: 'every' }],
			[remarkCustomBlocks, {
				details: {
					classes: 'details',
					title: 'required',
					details: true
				},
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

const onwarn = (warning, onwarn) => (warning.code === 'CIRCULAR_DEPENDENCY' && /[/\\]@sapper[/\\]/.test(warning.message)) || onwarn(warning)

export default {
	client: {
		input: config.client.input(),
		output: config.client.output(),
		plugins: [
			replace({
				'process.browser': true,
				...envVars,
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
			svelteSVG({ dev }),
			copy({
				targets: [
					{ src: 'src/**/images/*.*', dest: 'static/images' }
				]
			}),

			legacy && babel({
				extensions: ['.js', '.mjs', '.html', '.svelte', '.md'],
				babelHelpers: 'runtime',
				exclude: ['node_modules/@babel/**'],
				presets: [
					['@babel/preset-env', {
						targets: '> 0.25%, not dead'
					}]
				],
				plugins: [
					'@babel/plugin-syntax-dynamic-import',
					['@babel/plugin-transform-runtime', {
						useESModules: true
					}]
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
				...envVars,
			}),
			svelte({
				generate: 'ssr',
				dev,
				extensions: ['.svelte', '.md'],
				preprocess
			}),
			resolve({
				dedupe: ['svelte']
			}),
			commonjs(),
			svelteSVG({ generate: "ssr", dev }),
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
