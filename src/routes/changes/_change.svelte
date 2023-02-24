<!-- TODO make this a generic 'collapse' or something component-->

<!-- <section class="change">
	<slot />
</section>

<style>
	.change {
		padding: calc(var(--padding) / 2) var(--padding);
		margin-bottom: var(--padding);
		background: var(--pixelBorder);
		color: var(--colorPrimary);

		& :global {
			& *:not(a) {
				color: var(--colorText);
			}

			& p {
				margin: 0;

				&:first-of-type,
				&:last-of-type {
					margin-bottom: 1em;
				}
			}

			& details {
				& summary {
					font-size: 1.125em;
					cursor: pointer;

					/* hide default arrow */
					list-style: none;
					&::-webkit-details-marker {
						display: none;
					}

					&::before {
						content: '';
						display: inline-block;
						transition: var(--transitionSpeed);
						margin-right: 0.5em;
						height: 0;
						width: 0;
						border-top: 0.33em solid transparent;
						border-bottom: 0.33em solid transparent;
						border-left: 0.5em solid currentColor;
						transform: rotate(0turn);
					}
				}

				&[open] {
					& summary::before {
						transform: rotate(0.25turn);
					}
				}

				/* remark-custom-block inserts a div */
				& div {
					& > ul {
						/* top level only */
						border-left: var(--borderWidth) solid var(--colorPrimary);
						font-weight: bold;

						& ul {
							font-weight: normal;
							margin-top: 0;
						}
					}

					& ul {
						list-style: none;
						margin-left: 0.185rem;
						padding: 0 var(--padding);
					}
				}
			}
		}
	}
</style> -->
