<script lang='typescript'>
	import GlobalStyles from '$styles/globals.svelte'
	import Logo from '$components/logo.svelte'

	import { fonts } from '$styles/config'
	import VariableFont from '$components/styles/variable-font.svelte'
</script>

<GlobalStyles />

<Logo />

{#each Object.keys(fonts) as font}
  <VariableFont fontName={font} />
{/each}

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

		& article {
			flex: 1;
			display: flex;
			flex-direction: column;
			gap: 1rem;
		}
	}
</style>
