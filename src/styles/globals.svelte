<script>
	const fonts = import.meta.glob('/static/fonts/**.*')
</script>

<svelte:head>
	{#each Object.keys(fonts) as font}
		<link rel='preload' href={font.replace('/static', '')} as='font' type={font.split('.')[1]}>
	{/each}
</svelte:head>



<style global>
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
		--font-display: 'Science Gothic';
		/* "SFMono-Regular", Consolas, "Roboto Mono", "Droid Sans Mono", "Liberation Mono", Menlo, Courier, monospace */
		--font-sans-serif: 'IBM Plex';
		/* -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif */
		--font-mono: 'Recursive';
		/* "SFMono-Regular", Consolas, "Roboto Mono", "Droid Sans Mono", "Liberation Mono", Menlo, Courier, monospace */
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
