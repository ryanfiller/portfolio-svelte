<!-- TODO refactor this when majority of safari users are coming from 15.4+ -->
<!-- https://caniuse.com/?search=dialog -->

<svelte:options tag={null} />

<script>
  export let show = false
  export let close = false
  export let title
  export let id
  export let noJs = false

  import { onMount } from 'svelte'
  import slugify from '../../src/helpers/slugify'
  id = id || `${slugify(title)}`

  import Note from './note.svelte'
  import focusTrap from '../actions/focus-trap.js'

  let component, dialog
  let isSvelteComponent = true // this needs to default to true in this component becasue of the noJS prop

  onMount(() => {
    isSvelteComponent = Object.keys(component).includes('__svelte_meta')

    // shadow dom timing is weird, use a timeout to fire this when the browser event loop is empty
    setTimeout(() => {
      if (component) dialog = component.getElementsByTagName('dialog')[0]
    })

    if(!isSvelteComponent) {
      setTimeout(() => {
        if (component) {
          title = component.querySelectorAll('slot[name="heading"]')[0].assignedElements()[0].innerText
          id = id || slugify(title)
        }
      })
    }
  })

  $: if (dialog && !noJs) {
    (show === true || show === 'true') ? dialog.showModal() : dialog.close()
  }

  function handleClose(event) {
    if (!show || close === false || close === 'false') return
    if ((event.type ==='keydown' && event.key === 'Escape') || event.type ==='click') {
      if (close && typeof close === 'function') {
        // use the external close function...
        close()
      } else {
        // ... or not
        if (!isSvelteComponent) {
          document.querySelectorAll('rf-alert[show="true"]')[0]
          && document.querySelectorAll('rf-alert[show="true"]')[0].setAttribute('show', false)
        }
        show = false
      }
    }
  }
</script>

<style>
  /* pass some stuff into the child component with variables because shadow dom is hard */
  :global(.note),
  :global(rf-alert::part(note)) {
    --noteMaxHeight: 50vh;
    --buttonPadding: var(--buttonSize);
  }

  .alert {
    /* sizing in <Note> header is - font-size: 1.25em; padding-block: calc(0.75 * var(--padding)); */
    --buttonSize: calc(1.25em + (2 * (0.75 * var(--padding))));
  
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 1000;
    display: grid;
    grid-template-columns: auto minmax(auto, var(--readableMax)) auto;
    grid-template-rows: auto auto auto;
    padding: calc(2 * var(--padding));
    opacity: 1;
    transition: calc(1.5 * var(--transitionSpeed));
    visibility: visible;
    pointer-events: none;

    & * {
      pointer-events: initial;
    }

    & dialog {
      box-sizing: border-box;
      padding: 0;
      /* these grid attributres only work when noJS is on, but still need them */
      grid-column: 2 / 3;
      grid-row: 2 / 3;
      background-color: transparent;
      width: 100%;
      max-inline-size: var(--readableMax);
      /* seems to be the only way to stop this from crashing into the browser sides */
      border-block: none;
      border-inline: calc(2 * var(--padding)) solid transparent;
    }

    & button[title='close'] {
      position: absolute;
      inset-block-start: 0;
      inset-inline-end: 0;
      z-index: 100;
      border-radius: var(--pixelBorderRadius);
      background: transparent;
      border-style: none;

      cursor: pointer;
      grid-column: 2 / 3;
      grid-row: 2 / 3;
      align-self: start;
      justify-self: end;
      height: var(--buttonSize);
      width: var(--buttonSize);
      padding: calc(0.5 * var(--padding));
      display: flex;
      align-items: center;
      justify-content: center;

      &::after {
        content: '';
        display: block;
        color: var(--colorBackground);
        height: calc(5 * var(--pixelSize));
        width: calc(5 * var(--pixelSize));
        background: var(--pixelX);
        transform: scale(200%);
        transition: 0ms; /* trick the animation into only playing in one direction */
      }

      &:hover::after,
      &:focus::after {
        background: var(--pixelXHover);
        transition: var(--transitionSpeedIcons);
      }
    }
  }

  /* this can't be scoped to note or the web-component won't see it */
  :global([slot='actions']) {
    display: flex;
    justify-content: end;
    gap: 1em;
  }

  :global([data-no-js]) {
    & .alert {
      pointer-events: none;

      & * {
        pointer-events: auto !important;
      }
    }

    & dialog,
    & label {
      display: none !important;
      border: none;
    }

    & input {
      opacity: 0;
    }

    /* duplicate the close button styles, */
    /* for some reason tryign to do this in one block makes it invalid */
    & input,
    & label {
      position: relative;
      z-index: 100;

      cursor: pointer;
      grid-column: 2 / 3;
      align-self: start;
      grid-row: 2 / 3;
      justify-self: end;
      height: var(--buttonSize);
      width: var(--buttonSize);
      padding: calc(0.5 * var(--padding));
      display: flex;
      align-items: center;
      justify-content: center;

      &::after {
        content: '';
        display: block;
        color: var(--colorBackground);
        height: calc(5 * var(--pixelSize));
        width: calc(5 * var(--pixelSize));
        background: var(--pixelX);
        transform: scale(200%);
        transition: 0ms; /* trick the animation into only playing in one direction */
      }
    }

    & input:focus ~ label {
      /* TODO - need to globally style the focus state */
      outline: 2px auto Highlight;
    }

    & input:hover,
    & input:focus {
      & ~ label::after {
        background: var(--pixelXHover);
        transition: var(--transitionSpeedIcons);
      }
    }

    & input:checked,
    & input:checked ~ label,
    & input:checked ~ dialog {
      display: flex !important;
      visibility: visible !important;
    }

    /* ::backdrop only exists with JS, fake it here */
    & input:checked ~ dialog::after {
      content: '';
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: -1;
      backdrop-filter: brightness(50%);
    }
  }
</style>

<svelte:window on:keydown={handleClose}/>

<svelte:head>
  {#if noJs}
    {@html `
      <${'style'}>
        body:not([data-no-js]) #${id} {
          display: none;
        }
      </${'style'}>
    `}
  {/if}
</svelte:head>

<section
  role='alert'
  id={id}
  class='alert'
  bind:this={component}
>
  {#if noJs}
    <input
      id='no-js-close-button'
      name='no-js-close-button'
      style='display: none;'
      type='checkbox'
      checked={show}
      autocomplete='false'
    >
    <label
      tabindex='-1'
      for='no-js-close-button'
      style='display: none;'
    >
      <span aria-hidden='true'>
        close the alert
      </span>
    </label>
  {/if}

  <dialog
    part='dialog'
    aria-labelledby={`${id}-title`}
    aria-describedby={`${id}-content`}
    use:focusTrap={show}
  >
    {#if isSvelteComponent}
      <Note
        id={`${id}-alert`}
        title={title}
      >
        {#if !(close === false || close === 'false')}
          <button
            type='button'
            title='close'
            disabled={close === false}
            on:click={handleClose}
          />
        {/if}

        <slot />

        <slot name='actions' />
      </Note>
    {:else}
      <rf-note
        part='note'
        id={`${id}-alert`}
        title={title}
      >
        <!-- pass this from the this component into the note's heading slot -->
        <slot name='heading' slot='heading' />

        {#if !(close === false || close === 'false')}
          <button
            type='button'
            title='close'
            disabled={close === false}
            on:click={handleClose}
          />
        {/if}

        <slot />

        <slot name='actions' part='actions' />
      </rf-note>
    {/if }
  </dialog>
</section>