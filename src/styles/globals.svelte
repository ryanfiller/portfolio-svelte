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
	<script>
		cssHasPseudo(document);
	</script>
</svelte:head>

<style lang="postcss" global>
	/* ------------- */
	/* fonts */
	/* ------------- */

	@import url('./fonts.css');

	/* ------------- */
	/* sizes & postcss media queries */
	/* ------------- */

	/* these correspond to the sizes in @import url('./sizes.css'); */
	:root {
		--small-size: 576px;
		--medium-size: 768px;
		--large-size: 992px;
		--extra-size: 1400px;
		--nav-switch-size: var(--medium-size);
	}

	/* ------------- */
	/* for debugging */
	/* ------------- */

  /* html {
    background-color: #FF4136 !important;
    @media (--small-width) {
      background-color: #FF851B !important;
    }
    
    @media (--medium-width) {
      background-color: #FFDC00 !important;
    }
    
    @media (--large-width) {
      background-color: #3D9970 !important;
    }
    
    @media (--extra-width) {
      background-color: #0074D9 !important;
    }
  } */

	/* ------------- */
	/* default styles */
	/* ------------- */

	html {
		font-size: 12px;

		& body {
			margin: 0;
			font-size: 1.5rem;
			line-height: 1;
			/* color: var(--colorText); */
			/* background-color: var(--colorBackground); */
			font-family: var(--font-sans-serif);
			font-variation-settings: 'wght' 60, 'wdth' 500;
		}
	}

	/* ------------- */
	/* resets and preferences */
	/* ------------- */

	* {
		box-sizing: border-box;
	}

  /* fix all the wonky indentation */
	pre {
		white-space: pre-line;
	}

	:root {
		/* ------------- */
		/* global variables */
		/* ------------- */

		/* fonts */
		--font-display: 'Science Gothic';
		/* "SFMono-Regular", Consolas, "Roboto Mono", "Droid Sans Mono", "Liberation Mono", Menlo, Courier, monospace */
		--font-sans-serif: 'IBM Plex';
		/* -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif */
		--font-mono: 'Recursive';
		/* "SFMono-Regular", Consolas, "Roboto Mono", "Droid Sans Mono", "Liberation Mono", Menlo, Courier, monospace */

		/* spacing gaps and such */
		--spacing: clamp(1rem, 2.5vw, 2rem);
		--spacing-half: calc(0.5 * var(--spacing));
		--spacing-vertical: calc(2 * var(--spacing));

		/* colors */
		--color-overlay: rgb(0 0 0/ 0.25);

		/* accessibility stuff */
		--tapable-size: 40px;
		--readable-max: 65rem;
		--readable-column: minmax(auto, var(--readable-max));

		@media not all and (prefers-reduced-motion: reduce) {
			--transition-speed: 0.2s;
			--transition-timing: steps(6, end);

			scroll-behavior: smooth;
		}

		transition: var(--transition-speed);
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
