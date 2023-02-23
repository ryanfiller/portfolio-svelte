import autoprefixer from 'autoprefixer';
import nesting from 'postcss-nesting';
import customMedia from 'postcss-custom-media';
import globalData from '@csstools/postcss-global-data';

export default [
	autoprefixer,
	nesting,
	globalData({
		// this is relative to svelte.config.js
		files: ['./src/styles/sizes.css']
	}),
	customMedia
];
