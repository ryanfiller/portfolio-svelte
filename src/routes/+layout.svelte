<script lang="typescript">
	import Analytics from '$components/analytics.svelte'
	import KonamiCode from '$components/konami-code.svelte'
</script>

<Analytics />
<KonamiCode />

<div id="site">
	<slot />
</div>