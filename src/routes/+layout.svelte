<script lang="typescript">
	import Analytics from '$components/analytics.svelte'
	import KonamiCode from '$components/konami-code.svelte'
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { children } = $props();
</script>

<Analytics />
<KonamiCode />

<div id="site">
	{@render children?.()}
</div>