<script>
  import layout from '$stores/layout.js' 
</script>

<svelte:window on:keydown={event => {
  if (event.keyCode === 27) { // escape key
    $layout.naviconOpen = false
  }
}}/>

<style>
  /* there are TWO elements with this class in this file */
  .navicon {
    --naviconIconSize: (var(--naviconSize) - var(--padding));
    --naviconPixel: calc(var(--naviconIconSize)/ 5);
    --naviconTransitionSpeed: calc(0.5 * var(--offCanvasSpeed));
    cursor: pointer;
    height: var(--naviconSize);
    width: var(--naviconSize);
    
    &:is(input) {
      /* leave clickable area bigger than icon */
      margin: 0;

      /* remove appearance, but keep focus styles */
      appearance: none;

      &:not(:checked) {
        background: var(--colorPrimary);
      }
      @media (--touch) {
        &:checked {
          background: var(--colorPrimary);
        }
      }
    }

    &:not(:is(input)) {
      padding: calc((var(--naviconSize) - var(--naviconIconSize)) / 2);
      display: grid;
      grid-template-columns: repeat(5, var(--naviconPixel));
      grid-template-rows: repeat(5, var(--naviconPixel));
      pointer-events: none;
    }

    & span {
      display: block;
      height: 100%;
      width: 100%;
      pointer-events: none;
      transform: translate(0, 0) scale(1, 1);
      transition: var(--naviconTransitionSpeed);
      transition-timing-function: steps(3, end);
      background: currentColor;

      &.top {
        grid-row-start: 1;
      }

      &.bottom {
        grid-row-start: 5;
      }

      &.middle {
        grid-row-start: 3;
        grid-column: 3;
        transform: scaleX(5);
      }
    }

    &:checked + .navicon span {
      &:nth-of-type(3),
      &:nth-of-type(5) {
        transform: translateY(100%);
      }

      &:nth-of-type(4) {
        transform: translateY(200%);
      }

      &:nth-of-type(8),
      &:nth-of-type(10) {
        transform: translateY(-100%);
      }

      &:nth-of-type(9) {
        transform: translateY(-200%);
      }

      &.middle {
        transform: scaleX(1);
      }
    }
  }

  label#site-overlay {
    background: var(--colorBlack);
    transition: var(--offCanvasSpeed);
  }
  
</style>

<!-- https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#attr-checked -->
<input
  id='navicon'
  class='navicon'
  type='checkbox'
  autocomplete='false'
  bind:checked={$layout.naviconOpen}
  title={$layout.naviconOpen ? 'close' : 'open'}
/>

<div class='navicon'>
  <span class='middle'></span>
  <span class='top'></span>
  <span class='top'></span>
  <span class='top'></span>
  <span class='top'></span>
  <span class='top'></span>
  <span class='bottom'></span>
  <span class='bottom'></span>
  <span class='bottom'></span>
  <span class='bottom'></span>
  <span class='bottom'></span>
</div>

<label id='site-overlay' for='navicon'>
  <span class='screenreader'>show site sidebar</span>
</label>