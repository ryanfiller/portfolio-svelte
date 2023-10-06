<script lang="typescript">
	import GlobalStyles from '$styles/globals.svelte';
	import Logo from '$components/logo.svelte';

	import { fonts } from '$styles/config';
	import VariableFont from '$components/styles/variable-font.svelte';
	import Footer from '$components/layout/footer.svelte';
</script>

<GlobalStyles />

<Logo />

<section class="fonts">
	{#each Object.keys(fonts) as font}
		<VariableFont fontName={font} />
	{/each}
</section>

<Footer />

<style lang="postcss">
	:global(body) {
		min-height: 100dvh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.fonts {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		gap: 2rem;

		& > :global(*) {
			flex: 1;
			display: flex;
			flex-direction: column;
			gap: 1rem;
		}
	}
</style>
