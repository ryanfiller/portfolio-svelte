import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';
import sveltePreprocess from 'svelte-preprocess';

import postcssPlugins from './src/plugins/postcss/index.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		vitePreprocess(),
		sveltePreprocess({
			defaults: {
				style: 'postcss',
				script: 'typescript'
			},
			postcss: {
				plugins: postcssPlugins
			}
		})
	],

	kit: {
		adapter: adapter()
	}
};

export default config;
