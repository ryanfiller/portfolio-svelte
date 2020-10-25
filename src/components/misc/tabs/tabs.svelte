<script>
  export let name

  import { tabData } from './tab-data.js'  
  $tabData.groupName = name
</script>

<style global type='text/scss'>
  .tabs {
    // TODO make this global
    --borderColor: var(--colorActive);
    --borderWidth: .25rem;
    --border: var(--borderWidth) solid var(--borderColor);

    display: flex;
    flex-wrap: wrap;
    position: relative; // keep the inputs from going toooooo far
    margin-top: var(--verticalSpacing);
    margin-bottom: var(--verticalSpacing);

    // weird offsets that will work at all sizes
    margin-left: -1em;
    label, div {
      margin-left: 1em;
    }

    input {
      position: absolute;
      opacity: 0;
    }

    label {
      flex: 1;
      padding: .75em 1em calc(.75em - var(--borderWidth)) 1em;
      cursor: pointer;
      position: relative;
      margin-bottom: calc(-1 * var(--borderWidth));
      transition: var(--transitionSpeed);

      span {
        font-weight: 1.125em;
        display: inline-block;
        border-bottom: var(--borderWidth) solid transparent;
        transition: var(--transitionSpeed);
      }

      &:before {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        border: var(--border);
        transition: var(--transitionSpeed);
      }
    }

    div {
      border: var(--border);
      padding: 1em;
      width: 100%;
      order: 999;
      position: relative;
      z-index: 1;
    }

    // not active states
    label,
    input:checked ~ label ~ label {
      z-index: 0;
      background-color: transparent;
      color: currentColor;

      span {
        opacity: .75;
        border-bottom-color: transparent;
      }
    }

    div,
    input:checked ~ div ~ div {
      display: none;
    }

    // YES active states
    input:checked ~ label {
      z-index: 10;
      // border-color: currentColor;
      background-color: var(--borderColor);
      color: var(--colorLight);

      span {
        opacity: 1;
      }
    }

    input:checked ~ div {
      display: block;
    }


    // hover/focus states 
    label:hover,
    input:focus + label {
      span {
        opacity: 1;
        border-bottom-color: currentColor !important;
      }
    }
  }
</style>

<div
  class='tabs'
  role='tablist'
  aria-label={name}
>
  <slot />
</div>