<script>
  export let h = '2'
  export let title = ''
  export let slug = ''
  export let excerpt = ''
  export let posts = []

  export let hidePosts = false

  import PostPreview from './post-preview.svelte'

  const renderHeader = () => `
    <h${h} class='header'>
    ${hidePosts
      ? `<a rel='prefetch' href=${slug}>
        ${title}
      </a>`
      : title
    }
    </h${h}>
  `
</script>

<style>
  /* TODO this inherits a lot from post-preview.svelte, which isn't my favorite thing ever */
  article {
    padding: calc(2 * var(--padding)) var(--padding);
    /* include readable */
    max-width: var(--readableMax);
    margin: 0 auto;
    padding: var(--padding);

    & ul.post-preview-list {
      list-style: none;
      margin: 0;
      padding: 0;
    }
  }

  :global(.content-list) article {
    padding-left: 0;
    padding-right: 0;
  }
</style>

<article class='series-preview'>
  {#if !!title}
    {@html renderHeader()}
  {/if}
  <p class='excerpt'>
    {excerpt}
  </p>
  {#if !hidePosts}
    <ul class='post-preview-list'>
      {#each posts as post}
        <li>
          <PostPreview h='3' {...post} />
        </li>
      {/each}
    </ul>
  {/if}
  {#if hidePosts}
    <a rel='prefetch' href={slug}>
      See Posts
    </a>
  {/if}
  
</article>