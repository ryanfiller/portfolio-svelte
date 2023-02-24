<script lang="typescript">
	import logo from '/static/logo.svg?raw';

	function addTransitionDelay(svg: string) {
		return svg
			.split('\n') // explode the element
			.map((part, index) => {
				if (part.includes('<path')) {
					// if this is a `<path>` add a delay...
					return part.replace('<path', `<path style="--transition-index: ${index}"`);
				} else {
					// ...otherwise don't edit things like `<svg>`
					return part;
				}
			})
			.join('\n'); // make this into an svg and not an array
	}
</script>

<figure data-testid="logo">
	{@html addTransitionDelay(logo)}
</figure>

<style lang="postcss">
	figure {
		--transition-speed: 0.2s;

		resize: horizontal;
		overflow: hidden;
		width: 50vw;
		min-width: 7.5em;
		max-width: 33.125em;
		padding: 1rem;
		container-type: inline-size;
		display: flex;
		justify-content: center;

		:global {
			& svg {
				display: block;
				height: 10em;
				width: 100%;
				max-width: 7.5em;
				color: black;
				transition-duration: var(--transition-speed);

				& path {
					fill: currentcolor;
					stroke: currentcolor;
					stroke-linecap: round;
					stroke-width: 1;

					/* use where for specificity */
					&:where(.f) {
						transform: translateX(-11.75em);
					}

					&:where(:not(.r.one):not(.f)) {
						opacity: 0;
					}
				}
			}

			@container (min-width: 33.125em) {
				& svg {
					width: 100%;
					max-width: 33.125em;

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
