<script>
  export let data
  export let nested = false

  import File from './file.svelte'
  import Text from './text.svelte'
  import Transform from './transform.svelte'
</script>

<style>
  .data-flow-chart {
    list-style: none;
    padding: 0 var(--padding);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: .75em;

    &.top-level {
      margin: calc(2 * var(--padding)) 0;
      width: 100%;
      flex-direction: column;
    }

    &.nested {
      margin: 0;
      font-size: 1em;
      flex-direction: row;
      justify-content: center;
    }

    & :global {
      & li {
        margin: 0;
  
        &.text,
        &.file,
        &.browser {
          padding: 1rem;
        
          & svg {
            width: 7.5em;
          }
        }
      }
  
      & .transform {
        height: 12rem;
  
        & svg {
          transform: rotate(90deg);
          height: 100%;
          width: auto;
          overflow: hidden;
        }
      }
  
      & .text,
      & .file,
      & .browser,
      & .transform {
        display: grid;
        grid-template-columns: 100%;
        grid-template-rows: 100%;
        justify-items: center;
        align-items: center;
        
        & > * {
          grid-area: 1 / 1 / 1 / 1;
        }
  
        & .label {
          fill: var(--colorText);
          font-size: 1em;
          white-space: nowrap;
          padding: .5em;
          background: var(--colorBackground);
          border: var(--borderWidth) solid var(--colorText);
          z-index: 10;
        }
      }
  
      & .browser .label {
        border: none;
      }
  
      & .transform .label {
        border-radius: var(--borderRadius);
      }
    }


    /* TODO abstract this size into a utility class next time you need it */
    @media (min-width: 1200px) {
      &.top-level {
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        width: 100vw;
        max-width: 1500px;
        flex-direction: row;
      }

      &.nested {
        flex-direction: column;
        justify-content: space-between;
        align-self: stretch;
      }

      & :global {
        & .transform {
          flex-basis: 20%;
  
          & svg {
            flex: 1;
            transform: none;
            height: 100%;
            width: 100%;
          }
        }
      }
    }
  }
</style>

<ol class={nested ? 'data-flow-chart nested' : 'data-flow-chart top-level'}>
  {#each data as block, index}
    {#if Array.isArray(block)}
      <svelte:self data={block} nested={true} />
    {:else}
      {#if block.type === 'transform'}
        <Transform {...block} />
      {:else if block.type === 'text'}
        <Text {...block} />
      {:else} <!-- this catches `type='browser'`... for now... -->
        <File {...block} />
      {/if}
    {/if}
  {/each}
</ol>
