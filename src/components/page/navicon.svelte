<style>
  .navicon {
    --naviconPixel: calc(var(--naviconSize) / 5);
    --naviconTransitionSpeed: calc(1 * var(--transitionSpeed));
    position: relative;
    height: var(--naviconSize);
    width: var(--naviconSize);
    margin-right: var(--padding);

    display: grid;
    grid-template-columns: repeat(5, var(--naviconPixel));
    grid-template-rows: repeat(5, var(--naviconPixel));
    
    & input {
      opacity: 0;
      margin: 0;
      height: var(--naviconSize);
      width: var(--naviconSize);
      position: absolute;
      top: 0;
      left: 0;
    }

    & span {
      display: block;
      height: 100%;
      width: 100%;
      pointer-events: none;
      transform: translate(0, 0) scale(100%);
      transition: var(--naviconTransitionSpeed);
      transition-timing-function: steps(3, end);

      background: red;

      &.top {
        grid-row-start: 1;
      }

      &.bottom {
        grid-row-start: 5;
      }

      &.middle {
        grid-row-start: 3;
        grid-column: 1 / 6;
      }
    }

    & input:focus:not(checked) ~ span {
      background: var(--colorHighlight);
    }

    & input:checked {
      & ~ span{
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

        &:nth-of-type(1) {
          transform: scaleX(20%);
        }
      }
    }
  }
  
</style>

<div class='navicon'>
  <!-- autocomplete: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#attr-checked -->
  <input type='checkbox' id='navicon' autocomplete='false' />

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

<label class='overlay' for='navicon'>
  <span class='screenreader'>show site navigation</span>
</label>