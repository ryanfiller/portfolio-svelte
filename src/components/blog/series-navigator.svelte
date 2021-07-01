<script>
  import { getContext } from 'svelte'
  const series = getContext('series')
  let postIndex
  let previous
  let next

  $: if (series) {
    postIndex = series.posts.findIndex(post => post.title === $$props.title)
    if (series.posts[postIndex - 1]) {
      previous = series.posts[postIndex - 1]
    }
    if (series.posts[postIndex + 1]) {
      next = series.posts[postIndex + 1]
    }
  }
</script>

<style>
  .series-navigator {
    &.title {
      color: var(--colorWhite);
      background: var(--colorHighlight);
      text-align: center;
      padding: var(--padding);
  
      & a {
        color: inherit;
        &:not(:hover) {
          text-decoration: none;
        }
      }
    }
    
    &.buttons {
      background: var(--colorHighlight);
      display: flex;
    }
  
    & .previous,
    & .next {
      flex-wrap: wrap;
      width: 50%;
  
      &::before {
        font-size: .8em;
        margin-bottom: calc(.5 * var(--padding));
        display: block;
      }
    }
  
    & .previous {
      text-align: right;
      margin-right: auto;
  
      &::before {
        content: '« previous';
      }
    }
  
    & .next {
      text-align: left;
      margin-left: auto;
      
      &::before {
        content: 'next »';
      }
    }
  }
</style>

{#if series}  
  <aside class='series-navigator title'>
    This is post {postIndex + 1} of {series.posts.length} in the <a href={series.slug}>{series.title}</a> series.
  </aside>

  <slot />

  <aside class='series-navigator buttons'>
    {#if previous}
      <a href={previous.slug} class='previous button'>
        {previous.title}
      </a>
    {/if}
    {#if next}
      <a href={next.slug} class='next button'>
        {next.title}
      </a>
    {/if}
  </aside>

{:else}
  <slot />
{/if}
