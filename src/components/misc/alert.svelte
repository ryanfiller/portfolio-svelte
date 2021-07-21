<script>
  export let show
  export let close
  export let title
  
  import { slugify } from '../../helpers'
  const id = `${slugify(title)}`

  import Note from './note.svelte'
  import focusTrap from '../../actions/focus-trap.js'
</script>

<style>
  .alert {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 5000;
    height: 100%;
    width: 100%;
    padding: 0;
    border: 0;
    background-color: transparent;

    & :global(.note) {
      width: 100%;
      max-width: calc(var(--readableMax) - (4 * var(--padding)));

      &::after {
        color: var(--colorWhite);
      }
    }
  
    &::after {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: var(--colorBlack);
      opacity: .5;
      z-index: -1;
      pointer-events: none;
    }
  }

  .alert-actions {
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
    gap: 1rem;
  }
</style>

<svelte:window on:keydown={(show && close) ? event => event.key === 'Escape' && close() : null}/>

{#if show}
  <dialog
    open
    role='dialog'
    aria-labelledby={`${id}-title`}
    aria-describedby={`${id}-content`}
    class='alert'
    on:click={close ? event => event.target['tagName'] === 'DIALOG' && close() : null}
    tabindex='-1'
    use:focusTrap
  >
    <Note
      title={title}
      show={show}
      close={close}
    >
      <slot />
      {#if $$slots.actions}
        <div class='alert-actions'>
          <slot name='actions' />
        </div>
      {/if}
    </Note>
  </dialog>
{/if}