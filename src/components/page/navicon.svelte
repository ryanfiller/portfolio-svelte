<style>
  /* there are TWO elements with this class in this file */
  .navicon {
    --naviconPixel: calc(calc(var(--naviconSize) - var(--padding))/ 5);
    --naviconTransitionSpeed: calc(0.5 * var(--offCanvasSpeed));
    cursor: pointer;
    
    &:is(input) {
      /* leave clickable area bigger than icon */
      height: var(--naviconSize);
      width: var(--naviconSize);
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
      top: var(--padding) !important;
      margin-right: var(--padding) !important;
      height: calc(var(--naviconSize) - var(--padding));
      width: calc(var(--naviconSize) - var(--padding));
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
      /* transition-timing-function: steps(3, end); */
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

<!-- autocomplete: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#attr-checked -->
<input
  id='navicon'
  class='navicon'
  type='checkbox'
  autocomplete='false'
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
  <span class='screenreader'>show site navigation</span>
</label>