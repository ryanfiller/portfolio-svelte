import postcssPresetEnv from 'postcss-preset-env';
import globalData from '@csstools/postcss-global-data';

export default [
	globalData({
		// this is relative to svelte.config.js
		files: ['./src/styles/sizes.css']
	}),
	postcssPresetEnv({
		stage: 4,
		preserve: true,
		features: {
			'nesting-rules': true,
			'custom-media-queries': true,
			// need some client side js for this one -
			// https://github.com/csstools/postcss-plugins/tree/main/plugins/css-has-pseudo#browser
			'has-pseudo-class': true
		}
	})
];
