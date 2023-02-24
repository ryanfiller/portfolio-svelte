<script>
	import Logo from '$components/logo.svelte';
</script>

<main>
	<Logo />
	<!-- <h1>Welcome to SvelteKit</h1> -->
	<!-- <p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p> -->
</main>

<style lang="postcss">
	:global(body) {
		width: 100dvw;
		height: 100dvh;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	/* main {
		& h1 {
			color: lime;

			@media (--largeWidth) {
				color: pink;
			}
		}
	} */
</style>
