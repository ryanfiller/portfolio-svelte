
<script>
	export let status
	export let error
	const dev = process.env.NODE_ENV === 'development'
	import { meta } from '../site-config'
</script>

<style>
</style>

<svelte:head>
	<title>Uh Oh - {status} | {meta.title}</title>
</svelte:head>

<h1>Ruh Roh: {status}</h1>
<p>{error.message}</p>

{#if dev && error.stack}
	<pre>{error.stack}</pre>
{/if}