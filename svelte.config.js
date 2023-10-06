import path from 'path';
import adapterAuto from '@sveltejs/adapter-auto';
import adapterStatic from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';
import sveltePreprocess from 'svelte-preprocess';

import postcssPlugins from './src/plugins/postcss/index.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		vitePreprocess(),
		sveltePreprocess({
			postcss: {
				plugins: postcssPlugins,
				fallback: 'index.html'
			}
		})
	],

	kit: {
		adapter:
			process.env.ADAPTER === 'static'
				? adapterStatic({
						// strict: false
				  })
				: adapterAuto(),

		alias: {
			// $actions: path.resolve('./src/actions'),
			$components: path.resolve('./src/components'),
			$helpers: path.resolve('./src/helpers'),
			// $plugins: path.resolve('./src/plugins'),
			// $stores: path.resolve('./src/stores'),
			$styles: path.resolve('./src/styles')
			// $layouts: path.resolve('./src/layouts'),
			// '$site-config': path.resolve('./src/site-config.js')
		}
	}
};

export default config;
