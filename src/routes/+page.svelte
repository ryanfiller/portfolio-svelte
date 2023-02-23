<main>
	<h1>Welcome to SvelteKit</h1>
	<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
</main>

<style>
	main {
		& h1 {
			color: lime;

			@media (--largeWidth) {
				color: pink;
			}
		}
	}
</style>
