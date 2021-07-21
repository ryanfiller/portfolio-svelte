<script>
  export let openAlert

  import { alert } from './alert-store.js'

  let encodedContent 
  $: if (typeof window !== 'undefined') {
    encodedContent = btoa($alert.content)
  }

  $: localStorageMatch = encodedContent === $alert.id
</script>

<style>
  section {
    display: flex;
    flex-direction: column;
  }

  section > * {
    margin-bottom: var(--padding);
  }

  input,
  textarea {
    padding: 1rem;
    display: block;
    width: 100%;
  }

  textarea {
    min-width: 100%;
    min-height: 15rem;
  }

  span {
    display: block;
  }

  .buttons {
    display: flex;
  }

  .buttons button:not(:last-child) {
    margin-right: 1rem;
  }
</style>

<section>

  <label>
    <span>Title</span>
    <input
      type='text'
      bind:value={$alert.title}
    />
  </label>

  <label>
    <span>Content</span>
    <textarea
      bind:value={$alert.content}
    />
  </label>

  <label>
    <span>Content (encoded)</span>
    <input
      type='text'
      value={encodedContent}
      disabled
    />
  </label>

  <div class='buttons'>
    <button
      on:click={openAlert}
      style='flex: 1;'
      disabled={!!localStorageMatch}
    >
      {#if !!localStorageMatch}
        You've already seen this alert
      {:else}
        Open the alert
      {/if}
    </button>

    {#if !!localStorageMatch}
      <button
        on:click={() => $alert.id = ''}
      >
        Clear localStorage
      </button>
    {/if}
  </div>
</section>