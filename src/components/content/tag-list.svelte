<script>
  export let tags = []
  export let categories = []
</script>

<style>
  .tag-list {
    & .categories,
    & .tags {
      font-size: 1em;
      color: currentColor;
      list-style: none;
      padding: 0;
      margin: 0;
      display: inline-block;

      & li {
        margin: 0;
        display: inline-block;

        &::before {
          content: '#';
        }

        &::after {
          content: ',';
          margin-right: 0.25em;
        }
      }

      &:only-child, /* when there's only one list */
      & + ul { /* get rid of the last comma when cats and tags are siblings */
        & li:last-child::after {
          content: '';
          margin-right: 0;
        }
      }
    }
  }
</style>

<div class='tag-list'>
  {#if !!categories}
    <ul class='categories'>
    {#each categories as category}
      <li >{category}</li>
    {/each} 
    </ul>
  {/if}
  {#if !!tags}
    <ul class='tags'>
    {#each tags as tag}
      <li >{tag}</li>
    {/each}
    </ul>
  {/if}
</div>