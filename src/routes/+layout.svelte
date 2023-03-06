<script lang="typescript">
	// import { colors } from '$styles/config.js'
	import GlobalStyles from '$styles/globals.svelte';

	import Header from '$components/header.svelte';

	let resizeTimer: ReturnType<typeof setTimeout>
  $: isResizing = false
  const handleResizeJank = () => {
    clearTimeout(resizeTimer)
    isResizing = true
    resizeTimer = setTimeout(function() {
      // resizing has "stopped"
      isResizing = false
    }, 500)
  }
</script>

<svelte:head>
	<!-- <link rel='sitemap' type='application/xml' href='/sitemap.xml'>
  <meta name='theme-color' content={colors.primary}> -->

	<!-- analtyics -->
	<!-- <script 
		async
		src='//gc.zgo.at/count.js'
		data-goatcounter='https://ryanfiller.goatcounter.com/count'
	></script> -->

	<!-- webmention stuff -->
	<!-- <link rel='webmention' href='https://webmention.io/www.ryanfiller.com/webmention' />
  <link rel='pingback' href='https://webmention.io/www.ryanfiller.com/xmlrpc' /> -->
</svelte:head>

<svelte:window on:resize={handleResizeJank}/>

<GlobalStyles />

<div
	id="site"
	class={isResizing ? 'resizing' : ''}
>
	<Header />

	<main id="content" tabindex="-1">
		<slot />
	</main>

	<footer id="site-footer">
		footer
	</footer>
</div>

<style global lang="postcss">
	#site {
		display: grid;
		grid-template-rows: auto auto auto;
		grid-template-columns: 100%;
		grid-template-areas: "header"
		 										 "content"
												 "footer";
		max-block-size: 100%;
		max-inline-size: 100%;

		&.resizing {
			& * {
				transition: none !important;
			}
		}

		& header#site-header {
			grid-area: header;
		}

		& main#content {
			grid-area: content;
			overflow: auto;
		}

		& footer#site-footer {
			grid-area: footer;
		}

		/* writing-mode: horizontal-tb; */
		/* writing-mode: vertical-rl; */
		/* writing-mode: vertical-lr; */

		/* temp styles until colors are added */
		& header#site-header,
		& footer#site-footer {
			background-color: CanvasText;
			color: Canvas;

			& * {
				color: Canvas;
			}

			& nav[aria-label='main navigation'] ul li a {
				color: CanvasText !important;
			}
	
			& div[id$="-drawer"] {
				background: Canvas;
	
				& * {
					color: CanvasText !important;
				}
	
				&::before {
					background: Canvas;
				}
			}
	
			@media (--nav-switch-width) {
				& nav[aria-label='main navigation'] ul li a {
					color: Canvas !important;
				}
			}
		}
	}
</style>