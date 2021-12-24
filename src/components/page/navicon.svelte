<style>
  .navicon {
    position: relative;
    height: var(--naviconSize);
    width: var(--naviconSize);
    margin-right: var(--padding);
    
    & input {
      opacity: 0;
      margin: 0;
      height: var(--naviconSize);
      width: var(--naviconSize);
    }
    
    & svg {
      pointer-events: none;
      height: 100%;
      width: 100%;
      position: absolute;
      inset: 0;
      background: lime;

      & line {
        stroke: var(--colorWhite);
        stroke-width: .33em;
        transition: 1s;
        transform-origin: center center;
      }

      & .top {
        transform: translateY(1em);
        transition: top var(--transitionSpeed) ease var(--transitionSpeed),
                      transform var(--transitionSpeed) ease 0s;
      }

      & .middle {
        transition: opacity 0s ease var(--transitionSpeed);
      }

      & .bottom {
        transform: translateY(-1em);
        transition: bottom var(--transitionSpeed) ease var(--transitionSpeed),
                      transform var(--transitionSpeed) ease 0s;
      }
    }

    & input:focus + svg {
      /* box-shadow: 0px 0px 10px red; */
    }

    & input:checked + svg {
      & .top {
        transform: translate(0, 0);
        transition: top var(--transitionSpeed) ease 0s,
                    transform var(--transitionSpeed) ease var(--transitionSpeed);

        & line {
           transform: rotate(45deg);
           /* transition: top var(--transitionSpeed) ease 0s,
                    transform var(--transitionSpeed) ease var(--transitionSpeed); */
        }
      }

      & .middle {
        transform: scaleX(0);
        transition: opacity 0s ease var(--transitionSpeed);
      }

      & .bottom {
        transform: translate(0, 0);
        transition: bottom var(--transitionSpeed) ease 0s,
                    transform var(--transitionSpeed) ease var(--transitionSpeed);

        & line {
           transform: rotate(-45deg);
           /* transition: bottom var(--transitionSpeed) ease 0s,
                    transform var(--transitionSpeed) ease var(--transitionSpeed); */
        }
      }

      /*
      &--top, &--middle, &--bottom {
        display: block;
        height: .25rem;
        width: 100%;
        background-color: $color-white;
        position: absolute;
    }

    &--top {
        top: 0;
        transform: rotate(0deg);

        .open & {
            top: calc(50% - .125rem);
            transform: rotate(45deg);
        }
    }

    &--middle {
        top: 50%;
        transform: translateY(-50%);
        opacity: 1;

        .open & {
            opacity: 0;
        }
    }

    &--bottom {
        position: absolute;
        bottom: 0;

        .open & {
            bottom: calc(50% - .125rem);
            transform: rotate(-45deg);
        }
    } */

      /* &--top {
          transition: top $transition ease $transition,
                      transform $transition ease 0s;
      }
        .open &--top {
          transition: top $transition ease 0s,
                    transform $transition ease $transition;
        }


      &--middle {
          transition: opacity 0s ease $transition;
      }
        .open &--middle {
          transition: opacity 0s ease $transition;
        }


      &--bottom {
          transition: bottom $transition ease $transition,
                      transform $transition ease 0s;
      }
        .open &--bottom {
          transition: bottom $transition ease 0s,
                    transform $transition ease $transition;
        }
      */
    }
  }
  
</style>

<div class='navicon'>
  <!-- autocomplete: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#attr-checked -->
  <input type='checkbox' id='navicon' autocomplete='false' />
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 50'>
    <g class='top'><line x1='0' y1='25' x2='50' y2='25' /></g>
    <g class='middle'><line x1='0' y1='25' x2='50' y2='25' /></g>
    <g class='bottom'><line x1='0' y1='25' x2='50' y2='25' /></g>
  </svg>
</div>

<label class='overlay' for='navicon'>
  <span class='screenreader'>show site navigation</span>
</label>