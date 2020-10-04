<script>
  export let className =''
  export let date = ''
  export let dateFormat = 'MMMM dd, yyyy'
  export let tags = []
  export let categories = []

  import { format } from 'date-fns'
</script>

<style global type='text/scss'>
  .meta {
    &__date {
      display: block;
    }

    &__categories,
    &__tags {
      font-size: 1em;
      color: currentColor;
      list-style: none;
      padding: 0;
      margin: 0;
      display: inline-block;

      li {
        margin: 0;
        display: inline-block;

        &:before {
          content: '#'
        }

        &:after {
          content: ',';
          margin-right: .25em;
        }
      }

      & + ul { // get rid of the last comma when cats and tags are siblings
        li:last-child:after {
          content: '';
        }
      }
    }
  }
</style>

<div class={className ? `${className} meta` : 'meta'}>
  {#if date} 
    <time
      class='meta__date' 
      dateTime={date}
    >
      {format(new Date(date), dateFormat)}
    </time>
  {/if}
  {#if categories.length}
    <ul class='meta__categories'>
    {#each categories as category}
      <li >{category}</li>
    {/each} 
    </ul>
  {/if}
  {#if tags.length}
    <ul class='meta__tags'>
    {#each tags as tag}
      <li >{tag}</li>
    {/each}
    </ul>
  {/if}
</div>