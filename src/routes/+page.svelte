<script lang="typescript">
	import GlobalStyles from '$styles/globals.svelte';

	import { fonts } from '$styles/config';
	import VariableFont from '$components/styles/variable-font.svelte';
</script>

<GlobalStyles />

<section class="fonts">
	{#each Object.keys(fonts) as font}
		<VariableFont fontName={font} />
	{/each}
</section>

<style lang="postcss">
	:global(body) {
		min-height: 100dvh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.fonts {
		/* max-width: var(--readable-max); */
		margin-inline: auto;
		display: flex;
		flex-wrap: wrap;
		padding: 3rem;
		gap: 3rem;

		& > :global(*) {
			flex: 1;
			display: flex;
			flex-direction: column;
			gap: 1rem;
		}
	}
</style>
