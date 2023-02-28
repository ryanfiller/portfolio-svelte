import path from 'path';
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';
import sveltePreprocess from 'svelte-preprocess';

import postcssPlugins from './src/plugins/postcss/index.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		vitePreprocess(),
		sveltePreprocess({
			postcss: {
				plugins: postcssPlugins
			}
		})
	],

	kit: {
		adapter: adapter(),
		alias: {
			// $actions: path.resolve('./src/actions'),
			$components: path.resolve('./src/components'),
			// $helpers: path.resolve('./src/helpers'),
			// $plugins: path.resolve('./src/plugins'),
			// $stores: path.resolve('./src/stores'),
			$styles: path.resolve('./src/styles')
			// $layouts: path.resolve('./src/layouts'),
			// '$site-config': path.resolve('./src/site-config.js')
		}
	}
};

export default config;
