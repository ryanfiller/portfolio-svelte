<svelte:options tag={null} />

<script>
  import slugify from '../helpers/slugify.js'
  import { onMount } from 'svelte'

  export let title
  export let id = slugify(title)
  let component

  let isSvelteComponent

  onMount(() => {
    isSvelteComponent = Object.keys(component).includes('__svelte_meta')

    if(!isSvelteComponent) {
      // shadow dom timing is weird, use a timeout to fire this when the browser event loop is empty
      setTimeout(() => {
        if (component) {
          title = component.querySelectorAll('slot[name="heading"]')[0].assignedElements()[0].innerText
          id = id || slugify(title)
          component.id = id
        }
      })
    }
  })
</script>

<style>
  .note {
    position: relative;

    &::after {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 1;
      pointer-events: none;
      color: var(--colorHighlight);
      background: var(--pixelBorder);
    }

    & .content {
      background-color: var(--colorBackground);
      color: var(--colorText);
      padding: var(--padding);
      border-end-end-radius: var(--pixelBorderRadius);
      border-end-start-radius: var(--pixelBorderRadius);
      max-block-size: 100%;
      max-height: var(--noteMaxHeight);
      overflow: auto;
    }
  }

  .title {
    /* this component sometimes has a close button here, make sure its not too short for it */
    min-block-size: var(--tapableSize);
  }

  .title,
  :global([slot='heading']),
  :global(rf-alert [slot='heading']), /* specificity for when this is a child component */
  :global(rf-note::part(title)) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
    border-start-end-radius: var(--pixelBorderRadius);
    border-start-start-radius: var(--pixelBorderRadius);
    background-color: var(--colorHighlight);
    color: var(--colorBackground);
    padding-block: calc(0.75 * var(--padding));
    padding-inline-start: var(--padding);
    padding-inline-end: var(--buttonPadding, calc(0.75 * var(--padding)));
    margin: 0;
    font-size: 1.25em;
    font-family: var(--fontDisplay);
    font-variation-settings: "wght" 450, "wdth" 100, "YOPQ" 122;
    line-height: 1;
  }

  :global([slot='heading']) {
    /* this will be a compounding em, don't want that... */
    font-size: inherit;
    /* undo some other unfortunately nested stuff */
    padding: 0;
    border-radius: 0;
  }

  /* handful of undos for when the web component doesn't load */
  :global {
    & [data-no-js] {
      & rf-note{
        padding: var(--padding);
        background: var(--pixelBorder);
      }
  
      & [slot='heading'] {
        color: unset;
        background: unset;
      }
    }
  }
</style>

<section
  class='note'
  role='note'
  aria-labelledby={`${id}-title`}
  tabindex='0'
  bind:this={component}
  id={id}
>
  <header id={`${id}-title`}>
    <strong class='title'>
      <slot name='heading' part='title'>
        {title}
      </slot>
    </strong>
  </header>

  <div
    class='content'
    id={`${id}-content`}
  >
    <slot />
  </div>
</section>
