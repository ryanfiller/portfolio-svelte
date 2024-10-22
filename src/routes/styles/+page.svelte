<script lang="typescript">
	import { fonts } from '$styles/config'
	import GlobalStyles from '$styles/globals.svelte'
	import VariableFont from '$components/styles/variable-font.svelte'
</script>

<!-- TODO get rid of this -->
<GlobalStyles />

{#each Object.keys(fonts) as font}
	<VariableFont fontName={font} />
{/each}
