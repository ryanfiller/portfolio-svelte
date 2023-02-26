<script>
	// TODO - update this when `media="(not(prefers-reduced-data: reduce))"` is supported
	const fonts = import.meta.glob('/static/fonts/**.*');
</script>

<svelte:head>
	{#each Object.keys(fonts) as font}
		<link
			rel="preload"
			href={font.replace('/static', '')}
			as="font"
			type={`font/${font.split('.')[1]}`}
		/>
	{/each}
	<!-- include client side polyfill for :has selector -->
	<!-- https://github.com/csstools/postcss-plugins/tree/main/plugins/css-has-pseudo#browser -->
	<script src="https://unpkg.com/css-has-pseudo@5.0.2/dist/browser-global.js"></script>
  <!-- <script>cssHasPseudo(document)</script> -->
</svelte:head>

<style lang="postcss" global>
	/* ------------- */
	/* sizes & postcss media queries */
	/* ------------- */
	/* @import url('./sizes.css'); */

	/* ------------- */
	/* fonts */
	/* ------------- */

	@import url('./fonts.css');

	/* ------------- */
	/* variables */
	/* ------------- */

	/* :root {
	} */

	/* ------------- */
	/* default styles */
	/* ------------- */

	* {
		box-sizing: border-box;
	}

	html {
		& body {
			font-family: var(--font-sans-serif);
			font-variation-settings: 'wght' 60, 'wdth' 500;
		}
	}

	/* fix all the wonky indentation */
	pre {
		white-space: pre-line;
	}

	/* ------------- */
	/* conditional rendering */
	/* ------------- */

	body[data-no-js] .needs-js {
		display: none !important;
	}

	@media (prefers-reduced-data: reduce) {
		.no-reduce-data {
			display: none !important;
		}
	}

	/* ------------- */
	/* utility classes */
	/* ------------- */

	.screen-reader {
		position: absolute;
		width: 0;
		height: 0;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		border: 0;
	}
</style>
