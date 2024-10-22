<script lang="typescript">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	import { getCo2Emissions } from '$helpers';
	import type { Co2EmissionsResult } from '$helpers/get-co2-emissions';

	function link(text: string, url: string) {
		return `<a href="${url}" target="_blank" rel="noopener noreferrer">${text}</a>`;
	}

	let canWaitUntilRequestsAreDone: boolean;
	let calculating: Promise<Co2EmissionsResult>;

	onMount(() => {
		canWaitUntilRequestsAreDone = 'requestIdleCallback' in window;

		requestIdleCallback(() => {
			calculating = getCo2Emissions($page.url.hostname, 'kilobytes');
		});
	});
</script>

<details class="needs-js">
	<summary>
		{@html link('co2.js', 'https://www.thegreenwebfoundation.org/co2-js/')} data:
	</summary>
	{#if canWaitUntilRequestsAreDone}
		{#await calculating}
			...
		{:then c02}
			<pre>{JSON.stringify(c02, null, 2)}</pre>
		{/await}
	{:else}
		this feature uses {@html link(
			'<code>requestIdleCallback</code>',
			'https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback'
		)}, which {@html link(
			'your browser currently does not support',
			'https://caniuse.com/?search=requestIdleCallback'
		)}
	{/if}
</details>

<style>
	details :global(a) {
		color: currentcolor;
		font-weight: bolder;
	}

	pre {
		margin-top: 0;
		white-space: break-spaces;
	}
</style>
