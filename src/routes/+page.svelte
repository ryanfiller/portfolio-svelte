<script>
	import GlobalStyles from '$styles/globals.svelte'
	import Logo from '$components/logo.svelte';
</script>

<GlobalStyles />

<main>
	<Logo />

	<h1>Welcome to SvelteKit</h1>

	<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

	<code>
		<pre>
npm create svelte@latest my-app
cd my-app
npm install
npm run dev -- --open</pre>
	</code>
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

	main {
		& h1 {
			font-family: var(--font-display);
			text-align: center;
			/* font-family: var(--font-sans-serif); */
			/* color: lime;

			@media (--largeWidth) {
				color: pink;
			} */
		}

		& p {
			font-family: var(--font-sans-serif);
			text-align: center;
		}

		& code {
			& pre {
				background: snow;
				font-family: var(--font-mono);
				padding: 1em;
			}
		}
	}
</style>
