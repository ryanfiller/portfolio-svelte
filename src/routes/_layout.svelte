<script>
	export let segment
	// export let title
	import { stores } from '@sapper/app'
	const { page } = stores()

	import SEO from '../components/layout/seo.svelte'
	import Styles from '../components/layout/styles.svelte'

	import Header from '../components/layout/header.svelte'
	import Footer from '../components/layout/footer.svelte'


	import { markdown } from '../stores.js'

	// temporary fix for broken #hash links - https://github.com/sveltejs/sapper/issues/904#issuecomment-540536561
	import { onMount } from 'svelte'
	onMount(() => {
		document.querySelectorAll('a').forEach(a => {
			if (!a.hash || !document.querySelectorAll(a.hash).length) return
			a.addEventListener('click', event => {
				event.preventDefault()
				window.location.hash = event.target.getAttribute('href')
			})
		})
	})
</script>

<style global type="text/scss">
	@import '../styles/globals.scss';
	@import '../styles/functions.scss';

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
	}
</style>

<svelte:head>
	<link rel='stylesheet' href='/slowly-delete-these-styles.css'>
</svelte:head>

<Styles />
<SEO {segment} />

{#if segment === 'generate-image'}
	<slot />
{:else}
	<div
		id='site'
		className={segment}
	>
		<Header {segment} />
		<main id='content'>
			<slot />
		</main> 
		<Footer {segment} />
	</div>
{/if}
