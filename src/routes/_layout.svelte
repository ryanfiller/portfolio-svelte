<script>
	export let segment
	// export let title
	import Header from '../components/layout/header.svelte'
	import Footer from '../components/layout/footer.svelte'

	import SEO from '../components/layout/seo.svelte'

	import { markdown } from '../stores.js'

	// temporary fix for broken #hash links - https://github.com/sveltejs/sapper/issues/904#issuecomment-540536561
	import { onMount } from 'svelte'
	onMount(() => {
		document.querySelectorAll('a').forEach(a => {
			if (!a.hash || !document.querySelectorAll(a.hash).length) return
			a.addEventListener('click', event => {
				event.preventDefault()
				window.location.hash = event.target.getAttribute('href')
				event.target.scrollIntoView()
			})
		})
	})
</script>

<style global type="text/scss">
	@import '../styles/globals.scss';
	@import '../styles/functions.scss';

	html {
		font-size: 12px;

		body {
			margin: 0;
			font-size: 1.5rem;
			line-height: 1;
			background-color: var(--colorLight);
			color: var(--colorDark);
		}
	}

	* {
		box-sizing: border-box;
		
		@include animate {
			scroll-behavior: smooth;
		}
	}

	/* TODO remove this */
	.temp-bio,
	form#contact {
		@include readable();
		margin-bottom: var(--padding);
	}

	#site {
		min-height: 100vh;
		width: 100%;
		display: grid;
		grid-template-columns: 100%;
		justify-content: stretch;
		grid-template-rows: auto 1fr auto;
		align-items: center;
		grid-template-areas:
			"header"
			"content"
			"footer";

		#site-header {
			grid-area: header;
			width: 100%;
			height: 100%;
		}

		#content {
			grid-area: content;
			width: 100%;
			max-height: 100%;
		}

		#site-footer {
			grid-area: footer;
			width: 100%;
			height: 100%;
		}

		// @include extra() {
		//   --sidebarWidth: 20rem;
		//   display: initial;

		//   #site-header .header__content,
		//   #site-footer {
		//     position: fixed;
		//     width: var(--sidebarWidth);
		//   }
			

		//   #site-header .header__content {
		//     background: var(--colorPrimary);
		//     top: 0;
		//     left: 0;
		//     height: 75vh;
		//   }

		//   #site-header,
		//   #content {
		//     margin-left: var(--sidebarWidth);
		//     width: calc(100% 0 var(--sidebarWidth));
		//   }

		//   #site-footer {
		//     bottom: 0;
		//     left: 0;
		//     height: 25vh;
		//   }

		//   #site-header .header__content,
		//   #site-footer .footer__content {
		//     text-align: center;
		//     display: flex;
		//     flex-direction: column;
		//     align-items: center;
		//     justify-content: center;

		//     nav {
		//       .logo {
		//         margin: 0 auto;
		//       }

		//       ul {
		//         width: 100%;
		//         display: flex;
		//         flex-direction: column;
		//         align-items: center;
		//         justify-content: center;

		//         li {
		//           margin: 0;
		//         }
		
		//         a {
		//           display: inline-block;
		//           margin: .5em;
		//         }
		//       }
		//     }
		//   }

		//   #site-footer .footer__content {
		//     height: 100%;
		//     justify-content: space-between;
		//   }
		// }
	}
</style>

<svelte:head>
	<script 
		async
		src='//gc.zgo.at/count.js'
		data-goatcounter='https://ryanfiller.goatcounter.com/count'
	></script>
	<link rel='stylesheet' href='/slowly-delete-these-styles.css'>
</svelte:head>

<SEO segment={segment} />

<div id='site' className={segment}>
	<Header segment={segment} />
	<main id='content'>
		<slot markdown={$markdown}></slot>
	</main> 
	<Footer segment={segment} />
</div>
