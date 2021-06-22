<script>
	import { colors } from '../styles.js'
	import Styles from '../components/layout/styles.svelte'
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

<slot />
