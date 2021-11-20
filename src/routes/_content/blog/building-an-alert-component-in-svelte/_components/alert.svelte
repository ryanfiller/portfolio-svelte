<script>
  export let show
  export let close
  export let showButtons = false

  import { alert } from './alert-store.js'

  const closeForever = () => {
    $alert.id = btoa($alert.content)
    close()
  }

  import focusTrap from '../../../../../actions/focus-trap.js'
  import { slugify } from '$lib/helpers'

  let id
  if ($alert.title) {
    id = slugify($alert.title)
  }
</script>

<style>
  dialog {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 9999;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
    border: none;
  }

  dialog::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: black;
    opacity: 0.5;
    z-index: -1;
    pointer-events: none;
  }

  section {
    width: 100%;
    max-width: 50rem;
    border: 0.25rem solid var(--colorHighlight);
    background: var(--colorWhite);
    color: var(--colorBlack);
  }

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--colorWhite);
    background: var(--colorHighlight);
    padding-left: 1rem;
  }

  div.content {
    padding: 3rem 1rem 2rem 1rem;
    font-size: 2rem;
  }

  div.buttons {
    display: flex;
    justify-content: end;
    padding: 1rem;
  }

  div.buttons button:not(:last-child) {
    margin-right: 1rem;
  }
</style>

<svelte:window on:keydown={event => {event.key === 'Escape' ? close() : null}}/>

{#if show}
  <dialog
    on:click={close()}
    role='dialog'
    aria-labelledby={`${id}-title`}
    aria-describedby={`${id}-content`}
    tabindex='-1'
    use:focusTrap
  >
    <section>
      <header id={`${id}-title`}>
        <strong>
          {$alert.title}
        </strong>
        <button on:click={close()}>
          Close
        </button>
      </header>
  
      <div class='content' id={`${id}-content`}>
        {@html $alert.content}
      </div>

      {#if showButtons}
        <div class='buttons'>
          <button on:click={close()}>
            Close
          </button>

          <button on:click={closeForever}>
            Close Forever
          </button>
        </div>
      {/if}
    </section>
  </dialog>
{/if}