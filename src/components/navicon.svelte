<script lang='typescript'>
  export let boundElement: HTMLElement
  export let forSize: 'large' | 'small'
  export let open: Boolean
  export let toggle: Function
</script>

<button
  bind:this={boundElement}
  class="navicon"
  title={`${open ? 'hide' : 'show'} off canvas navigation`}
  data-for-size={forSize}
  on:click={toggle()}
>
  <label
    for="show-right-drawer"
    on:click={toggle()}
    on:keydown={toggle()}
  />
</button>

<!-- need top level `global` here for :has polyfill to work correctly -->
<style lang="postcss" global>
  :root {
    --navicon-size: var(--tapable-size);
		@media (--mouse) {
      --navicon-size: max(1.5rem, var(--spacing));
    }
  }

  .navicon {
    --pixel-size: calc(var(--navicon-size) / 5);
    --hamburger:
      /* top */
      no-repeat linear-gradient(currentcolor, currentcolor) calc(0 * var(--pixel-size)) calc(0 * var(--pixel-size)) / var(--pixel-size) var(--pixel-size), 
      no-repeat linear-gradient(currentcolor, currentcolor) calc(1 * var(--pixel-size)) calc(0 * var(--pixel-size)) / var(--pixel-size) var(--pixel-size), 
      no-repeat linear-gradient(currentcolor, currentcolor) calc(2 * var(--pixel-size)) calc(0 * var(--pixel-size)) / var(--pixel-size) var(--pixel-size), 
      no-repeat linear-gradient(currentcolor, currentcolor) calc(3 * var(--pixel-size)) calc(0 * var(--pixel-size)) / var(--pixel-size) var(--pixel-size), 
      no-repeat linear-gradient(currentcolor, currentcolor) calc(4 * var(--pixel-size)) calc(0 * var(--pixel-size)) / var(--pixel-size) var(--pixel-size),
      /* middle */
      no-repeat linear-gradient(currentcolor, currentcolor) calc(0 * var(--pixel-size)) calc(2 * var(--pixel-size)) / calc(5 * var(--pixel-size)) var(--pixel-size),
      /* bottom */
      no-repeat linear-gradient(currentcolor, currentcolor) calc(0 * var(--pixel-size)) calc(4 * var(--pixel-size)) / var(--pixel-size) var(--pixel-size), 
      no-repeat linear-gradient(currentcolor, currentcolor) calc(1 * var(--pixel-size)) calc(4 * var(--pixel-size)) / var(--pixel-size) var(--pixel-size), 
      no-repeat linear-gradient(currentcolor, currentcolor) calc(2 * var(--pixel-size)) calc(4 * var(--pixel-size)) / var(--pixel-size) var(--pixel-size), 
      no-repeat linear-gradient(currentcolor, currentcolor) calc(3 * var(--pixel-size)) calc(4 * var(--pixel-size)) / var(--pixel-size) var(--pixel-size), 
      no-repeat linear-gradient(currentcolor, currentcolor) calc(4 * var(--pixel-size)) calc(4 * var(--pixel-size)) / var(--pixel-size) var(--pixel-size)
    ;
    --x:
      /* top */
      no-repeat linear-gradient(currentcolor, currentcolor) calc(0 * var(--pixel-size)) calc(0 * var(--pixel-size)) / var(--pixel-size) var(--pixel-size), 
      no-repeat linear-gradient(currentcolor, currentcolor) calc(1 * var(--pixel-size)) calc(1 * var(--pixel-size)) / var(--pixel-size) var(--pixel-size), 
      no-repeat linear-gradient(currentcolor, currentcolor) calc(2 * var(--pixel-size)) calc(2 * var(--pixel-size)) / var(--pixel-size) var(--pixel-size),
      no-repeat linear-gradient(currentcolor, currentcolor) calc(3 * var(--pixel-size)) calc(1 * var(--pixel-size)) / var(--pixel-size) var(--pixel-size), 
      no-repeat linear-gradient(currentcolor, currentcolor) calc(4 * var(--pixel-size)) calc(0 * var(--pixel-size)) / var(--pixel-size) var(--pixel-size), 
      /* middle */
      no-repeat linear-gradient(currentcolor, currentcolor) calc(2 * var(--pixel-size)) calc(2 * var(--pixel-size)) / var(--pixel-size) var(--pixel-size),
      /* bottom */
      no-repeat linear-gradient(currentcolor, currentcolor) calc(0 * var(--pixel-size)) calc(4 * var(--pixel-size)) / var(--pixel-size) var(--pixel-size), 
      no-repeat linear-gradient(currentcolor, currentcolor) calc(1 * var(--pixel-size)) calc(3 * var(--pixel-size)) / var(--pixel-size) var(--pixel-size), 
      no-repeat linear-gradient(currentcolor, currentcolor) calc(2 * var(--pixel-size)) calc(2 * var(--pixel-size)) / var(--pixel-size) var(--pixel-size), 
      no-repeat linear-gradient(currentcolor, currentcolor) calc(3 * var(--pixel-size)) calc(3 * var(--pixel-size)) / var(--pixel-size) var(--pixel-size), 
      no-repeat linear-gradient(currentcolor, currentcolor) calc(4 * var(--pixel-size)) calc(4 * var(--pixel-size)) / var(--pixel-size) var(--pixel-size)
    ;
    
    border: none;
    outline: 0.25em solid CanvasText;
    background-color: CanvasText;

    &:focus,
    &:focus-visible {
      outline-color: SelectedItem;
    }

    & label {
      display: block;
      height: var(--navicon-size);
      width: var(--navicon-size);
      background: var(--hamburger);
      transition: var(--transition-speed);
			transition-timing-function: var(--transition-timing);
      cursor: pointer;
    }
  }

  header#site-header:has(#show-right-drawer:checked) {
    & .navicon label {
      background: var(--x);
    }
  }
</style>