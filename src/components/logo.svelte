<script lang="typescript">
	export let href: string;
	export let title: string;

	import logo from '/static/logo.svg?raw';

	function addTransitionDelay(svg: string) {
		let iterator = 0
		return svg
			.split('\n') // explode the element
			.map((part) => {
				if (part.includes('<path')) {
					// if this is a `<path>` start counting at 1...
					iterator = iterator + 1
					// ... and add a delay...
					return part.replace('<path', `<path style="--transition-index: ${iterator}"`);
				} else {
					// ...otherwise don't edit things like `<svg>`
					return part;
				}
			})
			.join('\n'); // make this into an svg and not an array
	}

	const rendered = addTransitionDelay(logo);
</script>

<figure
	class="logo"
	title={href ? null : title || null}
>
	{#if href}
		<a
			{href}
			title={title}
		>
			{@html rendered}
		</a>
	{:else}
		{@html rendered}
	{/if}
</figure>

<style lang="postcss">
	a {
		display: inline-block;
	}

	figure {
		container-type: inline-size;
		font-size: 1em;
		margin: 0;
		line-height: 0;

		:global {
			& svg {
				inline-size: 100%;
				/* canvas 210px x 280px */
				/* this ratio reduces to 21 x 28 */
				aspect-ratio: 21 / 28;
				max-inline-size: 1.5em;

				& path {
					fill: currentcolor;
					stroke: currentcolor;
					stroke-linecap: round;
					stroke-inline-size: 1;

					/* use where for specificity */
					&:where(.f) {
						transform: translateX(-39.5%);
					}

					&:where(:not(.r.one):not(.f)) {
						opacity: 0;
					}
				}
			}

			/* logo is 6.7125em wide */
			@container (min-width: 10em) {
				& svg {
					/* canvas 960px x 280px */
					/* this ratio reduces to 24 x 7 */
					aspect-ratio: 24 / 7;
					max-inline-size: 6.6em;

					& path {
						opacity: 1;
						transform: translateX(0);

						&:where(.f) {
							transition-delay: calc(var(--transition-speed) / var(--transition-index));
						}

						/* only animate this when going from small to large */
						transition-duration: var(--transition-speed);
						transition-delay: calc(var(--transition-speed) * (0.25 * var(--transition-index)));
					}
				}
			}
		}
	}
</style>
