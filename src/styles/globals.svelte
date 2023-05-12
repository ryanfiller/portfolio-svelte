<script>
	const fonts = import.meta.glob('/static/fonts/**.*');
</script>

<svelte:head>
	{#each Object.keys(fonts) as font}
		<link rel="preload" href={font.replace('/static', '')} as="font" type={font.split('.')[1]} />
	{/each}
</svelte:head>

<style lang="postcss" global>
	/* ------------- */
	/* sizes & postcss media queries */
	/* ------------- */
	@import url('./sizes.css');

	/* ------------- */
	/* fonts */
	/* ------------- */

	@import url('./fonts.css');

	/* ------------- */
	/* variables */
	/* ------------- */
	:root {
		/* fonts */
		/* i'm not 100% sure this works, but do your best to always get a variable font on mac, window, and android */
		--font-fallback-stack: '-apple-system', 'San Francisco Variable', 'Segoe UI Variable', 'Roboto Variable', system-ui;
		--font-display: 'Science Gothic', var(--font-fallback-stack), serif;
		--font-sans-serif: 'IBM Plex', var(--font-fallback-stack), sans-serif;
		--font-mono: 'Recursive', var(--font-fallback-stack), monospace;

		@media (prefers-reduced-data: reduce) {
			--font-display: var(--font-fallback-stack), serif;
			--font-sans-serif: var(--font-fallback-stack), sans-serif;
			--font-mono: var(--font-fallback-stack), monospace;
		}
	}

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
	/* utility classes */
	/* ------------- */

	body[data-no-js] .needs-js {
		display: none !important;
	}

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
