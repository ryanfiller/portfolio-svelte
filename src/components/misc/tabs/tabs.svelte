<script>
  export let name

  import { setContext } from 'svelte'
  import { writable } from 'svelte/store'

  setContext('tabs', { data: writable({
    group: name,
    tabs: [],
    active: ''
  })})
</script>

<style>
  :root {
    --borderColor: var(--colorPrimary);
    --border: var(--borderWidth) solid var(--borderColor);
  }
  
  .tabs {
    display: flex;
    flex-wrap: wrap;
    position: relative; /* keep the inputs from going toooooo far */
    margin-top: var(--verticalSpacing);
    margin-bottom: var(--verticalSpacing);

    /* weird offsets that will work at all sizes */
    margin-left: -1em;

    & :global {
      & label, 
      & div[role="tabpanel"] {
        margin-left: 1em;
      }
  
      & input {
        position: absolute;
        opacity: 0;
      }
  
      & label {
        flex: 1;
        padding: .75em 1em calc(.75em - var(--borderWidth)) 1em;
        cursor: pointer;
        position: relative;
        margin-bottom: calc(-1 * var(--borderWidth));
        transition: var(--transitionSpeed);
        border: var(--border);
  
        & span {
          font-weight: 1.125em;
          display: inline-block;
          border-bottom: var(--borderWidth) solid transparent;
          transition: var(--transitionSpeed);
        }
      }
  
      & div[role="tabpanel"] {
        border: var(--border);
        padding: 1em;
        width: 100%;
        max-width: 100%;
        overflow: auto;
        order: 999;
        position: relative;
        z-index: 1;
  
        & > * {
          /* this is to combat code style width */
          margin: 0;
          left: unset;
          right: unset;
          width: 100%;
        }
  
        & > *:last-child {
          margin-bottom: 0;
        }
      }
  
      /* not active states */
      & label,
      & input:checked ~ label ~ label {
        z-index: 0;
        background-color: transparent;
        color: currentColor;
        border-color: var(--colorHighlight);
  
        & span {
          border-bottom-color: transparent;
        }
      }
  
      & div[role="tabpanel"],
      & input:checked ~ div[role="tabpanel"] ~ div[role="tabpanel"] {
        display: none;
      }
  
      /* YES active states */
      & input:checked ~ label {
        z-index: 10;
        border-color: var(--borderColor);
        background-color: var(--borderColor);
        color: var(--colorWhite);
      }
  
      & input:checked ~ div[role="tabpanel"] {
        display: block;
      }
  
  
      /* hover/focus states  */
      & label:hover,
      & input:focus + label {
        background-color: var(--colorHighlight) !important;
        
        & span {
          color: var(--colorWhite) !important;
        }
      }
  
      /* hover/focus for already active */
      & input:checked + label:hover {
        background-color: var(--borderColor) !important;
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