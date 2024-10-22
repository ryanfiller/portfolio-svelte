<!-- @migration-task Error while migrating Svelte code: Unexpected token -->
<script lang="typescript">
	import CO2 from '$components/co2.svelte'

	import { sendToAnalytics } from '$helpers'

	let tracked = false

	function track(event: Event) {
		event.preventDefault()
		sendToAnalytics({ event: 'footer button' })
		tracked = true
	}
</script>

<footer>
	<CO2 />

	{#if tracked}
		<a target="_blank" rel="noopener noreferrer" href="https://ryanfiller-beta.goatcounter.com/">
			go see if it worked
		</a>
	{:else}
		<button on:click={track}>
			send a tracking event
		</button>
	{/if}

</footer>

<style lang="postcss">
	footer {
		width: 100%;
		background: canvastext;
		color: canvas;
		padding: 1rem;
		align-items: start;
		flex-wrap: wrap;
		display: flex;
		gap: 1rem;
		justify-content: space-between;

		& a {
			color: white;
		}
	}
</style>
