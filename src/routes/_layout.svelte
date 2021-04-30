<script>
	import { setContext } from 'svelte'
	import { colors } from '../styles.js'

	import Styles from '../components/layout/styles.svelte'

	// TODO this `segment` section needs work
	// $page.error is introduced in sapper 0.28, but that introduced the double svelte:head bug
	// https://github.com/sveltejs/svelte/issues/4308
	// waiting on this issue to revolve, then revisit this
	import { stores } from '@sapper/app'
	const { page } = stores()
	export let segment
	const getSegement = () => {
		if ($page.error) {
			return 'error'
		} else if (!!segment) {
			return segment
		} else {
			return 'homepage'
		}
	}
	$: {
		segment = getSegement()
		setContext('segment', segment)
	}

	// temporary fix for broken #hash links, run it on every page
	// https://github.com/sveltejs/sapper/issues/904#issuecomment-540536561
	import { afterUpdate } from 'svelte'
	afterUpdate(() => {
		document.querySelectorAll('a').forEach(a => {
			if (!a.hash || !document.querySelectorAll(a.hash).length) return
			a.addEventListener('click', event => {
				event.preventDefault()
				window.location.hash = event.target.getAttribute('href')
			})
		})
	})
</script>

<svelte:head>
	<link rel='sitemap' type='application/xml' href='/sitemap.xml'>
  <meta name='theme-color' content={colors.primary}>

	<!-- analtyics -->
	<script 
		async
		src='//gc.zgo.at/count.js'
		data-goatcounter='https://ryanfiller.goatcounter.com/count'
	></script>

  <!-- webmention stuff -->
  <link rel='webmention' href='https://webmention.io/www.ryanfiller.com/webmention' />
  <link rel='pingback' href='https://webmention.io/www.ryanfiller.com/xmlrpc' />
  <!-- https://webmention.io/api/mentions.html?token=nseQFcsLWSvq0TOTOuSVkQ -->
  <!-- https://webmention.io/api/mentions.atom?token=nseQFcsLWSvq0TOTOuSVkQ -->
  <!-- nseQFcsLWSvq0TOTOuSVkQ -->

  <!-- webmonetization stuff -->
  <meta name='monetization' content='$ilp.uphold.com/grFqX3z4EBqj'>
</svelte:head>

<Styles />

<div
  id='site'
  class={segment}
>
	<slot />
</div>