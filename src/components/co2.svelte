<script lang="typescript">
	import { page } from '$app/stores';
	import { co2Emissions } from '$helpers';
</script>

<details>
	<summary>
		<a
			target="_blank"
			rel="noopener noreferrer"
			href="https://www.thegreenwebfoundation.org/co2-js/"
		>
			co2.js
		</a>
		data:
	</summary>

	{#await co2Emissions($page.url.hostname, 'kilobytes')}
		...
	{:then c02}
		<pre>{JSON.stringify(c02, null, 2)}</pre>
	{/await}
</details>

<style>
	summary a {
		color: currentcolor;
		font-weight: bolder;
	}

	pre {
		margin-top: 0;
		white-space: break-spaces;
	}
</style>
