<!-- @migration-task Error while migrating Svelte code: Unexpected token -->
<script lang='typescript'>
	let analyticsUrl: string
  const mode = import.meta.env.MODE

	switch (mode) {
    case 'development':
    case 'testing':
			analyticsUrl = 'https://testing-analytics/'
			break;
		case 'beta':
			analyticsUrl = 'https://ryanfiller-beta.goatcounter.com/count'
			break;
    case 'production':
			analyticsUrl = 'https://ryanfiller.goatcounter.com/count'
			break;
		default:
			analyticsUrl = ''
	}
</script>

<svelte:head>
	<script
		async
		src={mode !== 'testing' ? '//gc.zgo.at/count.js' : 'testing-analytics.js'}
		data-goatcounter={analyticsUrl}
	/>
</svelte:head>

<noscript>
	<!-- send an event that some with no js came to the site -->
	<img data-testid='tracking-pixel' alt='' src={`${analyticsUrl}?p=/no-js&e=true`} />
</noscript>
