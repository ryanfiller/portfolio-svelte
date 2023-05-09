<script lang='typescript'>
	import GlobalStyles from '$styles/globals.svelte'
	import Logo from '$components/logo.svelte'

	import VariableFont from '$components/styles/variable-font.svelte'

	const fontCategories: {[key: string]: string[]} = {
		header: ['Science Gothic', 'Fraunces'],
		body: ['IBM Plex', 'Inter'],
		code: ['Recursive', 'Fira Code']
	}

	const fontsRendered = Object.values(fontCategories).map(option => option[0])
</script>

<GlobalStyles />

<Logo />

<section class='fonts'>
	{#each Object.keys(fontCategories) as category, index}
		<article>
			<h2>
				{category} font
			</h2>
			<select
				name={category}
				id={category}
				bind:value={fontsRendered[index]}
			>
				{#each fontCategories[category] as option }
					<option value={option}>
						{option}
					</option>
				{/each}
			</select>
			<VariableFont fontName={fontsRendered[index]} />
		</article>
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
