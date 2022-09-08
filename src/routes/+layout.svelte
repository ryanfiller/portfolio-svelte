<script>
	// export const prerender = true
	export const prerender = false
	import AppLoader from '$components/misc/app-loader.svelte'

	import { colors } from '$styles/config.js'

	import Styles from '$styles/globals.svelte'
	import ThemeControls from '$components/theme/theme-controls.svelte'
</script>

<svelte:head>
	<link rel='sitemap' type='application/xml' href='/sitemap.xml'>
  
	<meta name='theme-color' content={colors.primary}>

	<!-- avoid svelte-preprocess trying to turn this into typescript -->
	<svelte:element this='script' src='/web-components.js' />

	<!-- analtyics -->
	<script 
		async
		src='//gc.zgo.at/count.js'
		data-goatcounter='https://ryanfiller.goatcounter.com/count'
	/>

  <!-- webmention stuff -->
  <link rel='webmention' href='https://webmention.io/www.ryanfiller.com/webmention' />
  <link rel='pingback' href='https://webmention.io/www.ryanfiller.com/xmlrpc' />
  <link rel='???' href='https://webmention.io/api/mentions.html?token=nseQFcsLWSvq0TOTOuSVkQ' />

  <!-- webmonetization stuff -->
  <meta name='monetization' content='$ilp.uphold.com/grFqX3z4EBqj'>
</svelte:head>

<AppLoader>
	<Styles />
	
	<ThemeControls />
	
	<slot />
</AppLoader>
