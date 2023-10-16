<script lang='typescript'>
	import Logo from '$components/logo.svelte';
	import Navigation from '$components/navigation.svelte';
	import Navicon from '$components/navicon.svelte';
	import Drawer from '$components/drawer.svelte';

	let isRightDrawerOpen = false;
	function toggleRightDrawer() {
		isRightDrawerOpen = !isRightDrawerOpen
	}

	// bind some dom nodes for focus trapping
	let smallNavicon: HTMLElement,
			largeNavicon: HTMLElement,
			mainNavLinks: Array<HTMLElement> = []

</script>

<header
	id="site-header"
>
	<Drawer side='left'>
		<nav title="skip navigation">
			<ul>
				<li><a href="#content">skip to content</a></li>
				<li><a href="#main-navigation">skip to navigation</a></li>
			</ul>
		</nav>
		<nav title="table of contents">
			<ul>
				<li><a href="one">one</a></li>
				<li><a href="two">two</a></li>
				<li><a href="three">three</a></li>
			</ul>
		</nav>
	</Drawer>

	<Logo
		href="/"
		title="homepage"
	/>

	<input
		type="checkbox"
		id="show-right-drawer"
		autocomplete="false"
		bind:checked={isRightDrawerOpen}
	/>

	<Navicon
		bind:boundElement={smallNavicon}
		forSize='small'
		open={isRightDrawerOpen}
		toggle={toggleRightDrawer}
	/>

	<Navigation
		bind:boundElements={mainNavLinks}
	/>

	<Navicon
		bind:boundElement={largeNavicon}
		forSize='large'
		open={isRightDrawerOpen}
		toggle={toggleRightDrawer}
	/>

	<Drawer
		side='right'
		open={isRightDrawerOpen}
		toggle={toggleRightDrawer}
		trapFocus
		additionalFocusTrapElements={[smallNavicon, largeNavicon, ...mainNavLinks]}
	>
		<div>
			something
			<a href="with">with</a>
			<a href="links">links</a>
		</div>
	</Drawer>
</header>

<!-- need top level `global` here for :has polyfill to work correctly -->
<style lang="postcss" global>
	/* https://stackoverflow.com/questions/30855985/pure-css-animation-visibility-with-delay#answer-30856455 */
	@keyframes visibility-delay-hack {
		99% {
			visibility: visible;
		}

		100% {
			visibility: hidden;
		}
	}

	header#site-header {
		--gap: var(--spacing);
		--logo-height: 2em;
		--header-height: calc(var(--logo-height) + var(--spacing));

		padding: var(--spacing-half) var(--spacing);
		font-size: 2rem;
		/* a lot of stuff is absolutely positioned and not actually in the grid, */
		/* but still make the things that are aware of the their size */
		display: grid;
		grid-template-rows: var(--logo-height);
		grid-template-columns: 1fr 1fr 0 var(--navicon-size);
		grid-template-areas: 'logo gap navigation navicon';
		gap: var(--gap);
		align-items: center;
		justify-content: space-between;
		position: relative;

		@media (--small-height) {
			position: sticky;
			inset-block-start: 0;
		}

		/* hide the navicon checkbox */
		#show-right-drawer {
			visibility: collapse;
		}

		& .logo {
			grid-area: logo;
		}

		& .navicon {
			position: relative;
			z-index: 300;
			padding: 0;
			grid-area: navicon;

			&[data-for-size='large'] {
				display: none;
			}
		}

		& nav[aria-label='main navigation'] {
			inline-size: var(--drawer-width);
			position: fixed;
			z-index: 250;
			inset-inline-end: calc(-1 * var(--drawer-width));
			inset-block-start: var(--header-height);
		}

		/* these positionings should be transforms, but I really want to use logical properties */
		/* perf/framerate shouldn't matter since I'm using steps animation anyways? */

		& #left-drawer {
			z-index: 350;
			inset-inline-start: calc(-1 * var(--drawer-width));

			&:focus-within {
				inset-inline-start: 0;
			}
		}

		& #right-drawer {
			z-index: 200;
			inset-inline-end: calc(-1 * var(--drawer-width));
			padding-block-start: calc(var(--header-height) + (var(--main-navigation-count) * 1.5em) + var(--gap));
			display: flex;
			flex-direction: column;
			justify-content: center;
		}

		&:has(#show-right-drawer:not(:checked)) {
			& nav[aria-label='main navigation'],
			& #right-drawer * {
				animation-name: visibility-delay-hack;
				animation-duration: var(--transition-speed);
				animation-fill-mode: forwards;
			}
		}

		&:has(#show-right-drawer:checked) {
			& #right-drawer,
			& nav[aria-label='main navigation'] {
				inset-inline-end: 0;
			}

			& nav[aria-label='main navigation'],
			& #right-drawer * {
				visibility: visible;
			}
		}

		& #right-drawer:focus-within {
			inset-inline-end: 0;

			* {
				visibility: visible !important;
			}
		}

		@media (--nav-switch-width) {
			grid-template-columns: 1fr calc(1ch * var(--main-navigation-length)) var(--navicon-size);
			
			& .navicon {
				&[data-for-size='small'] {
					display: none;
				}

				&[data-for-size='large'] {
					display: revert;
				}
			}

			& #right-drawer {
				padding-block-start: var(--header-height);
			}

			& nav[aria-label='main navigation'] {
				grid-area: navigation;
				/* undo small styles to put this into the drawer */
				visibility: visible !important;
				position: absolute;
				inset-block-start: 0;
				inset-inline-end: 0;
				inline-size: auto;
				/* make sure this goes under the drawer */
				z-index: 150;
			}

			&:has(nav[aria-label='main navigation']:focus-within) {
				& #right-drawer {
					& * {
						visibility: visible !important;
					}
				}
			}
		}
	}
</style>
