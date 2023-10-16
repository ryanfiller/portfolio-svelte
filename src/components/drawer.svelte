<script lang='typescript'>
  export let side: 'left' | 'right';
  export let open: Boolean | undefined = undefined
  export let toggle: Function | undefined = undefined
  export let trapFocus: Boolean = false
  export let additionalFocusTrapElements: Array<HTMLElement | undefined> = []

  import focusTrap from '$actions/focus-trap'

  function closeDrawer() {
    if (open && toggle) toggle()
  }

  // woof, these names...
  const shouldTrapFocus = trapFocus ? focusTrap : () => {}
</script>

<svelte:window
  on:keydown={(event) => { if (event.key === 'Escape') closeDrawer() }}
/>

<div
  id="{side}-drawer"
  data-testid="{side}-drawer"
  use:shouldTrapFocus={{ isActive: !!open, additionalElements: additionalFocusTrapElements }}
  >
  <slot />
  <div
    class='overlay'
    on:click={(closeDrawer)}
    on:keydown={(closeDrawer)}
  />
</div>

<!-- need top level `global` here for :has polyfill to work correctly -->
<style lang="postcss" global>
  :root {
		--drawer-width: calc(100dvw - var(--navicon-size) - (2 * var(--spacing)));

    @media (--small-width) {
      --drawer-width: 75dvw;
    }

    @media (--medium-widthh) {
      --drawer-width: 50dvw;
    }

    @media (--large-width) {
      --drawer-width: 25dvw;
    }

    @media (--extra-width) {
      --drawer-width: min(15dvw, 50rem);
    }
	}

  div[id$="-drawer"] {
    inline-size: var(--drawer-width);
    padding: var(--spacing);
    position: fixed;
    inset-block-start: 0;
    inset-block-end: 0;
    transition: var(--transition-speed);
    transition-timing-function: var(--transition-timing);

    /* stacking context gets weird with `position: fixed`, */
    /* so fake the background color and put everything on top of it */
    &::before {
      content: '';
			display: block;
      position: absolute;
      inset: 0;
      z-index: 1;
    }

    & > :global(*) {
      position: relative;
      z-index: 2;
    }

    & .overlay {
      opacity: 0;
      background-color: var(--color-overlay);
			position: fixed;
			inset: -10vmax;
			transition: var(--transition-speed);
			transition-timing-function: var(--transition-timing);
			pointer-events: none;
			z-index: -1;
		}
  }

  body {
		&:has([id$="-drawer"]:focus-within),
		&:has(#show-right-drawer:checked) {
			overflow: hidden;

      @media (--small-height) {
        overflow: auto;
      }
		}

    & [id^="left"]:focus-within .overlay {
      opacity: 1;
      pointer-events: revert;
    }

    &:has(#show-right-drawer:checked) [id^="right"] .overlay,
    & [id^="right"]:focus-within .overlay {
      opacity: 1;
      pointer-events: revert;
    }
	}
</style>
