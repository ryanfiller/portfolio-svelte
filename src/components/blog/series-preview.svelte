<script>
  export let h = '2'
  export let title = ''
  export let slug = ''
  export let excerpt = ''
  export let posts = []

  export let hidePosts = false

  import PostPreview from './post-preview.svelte'

  const renderHeader = () => `
    <h${h} class='post-preview__header'>
    ${hidePosts
      ? `<a rel='prefetch' href=${slug}>
        ${title}
      </a>`
      : title
    }
    </h${h}>
  `
</script>

<style global type='text/scss'>
  // this is currently inehertting .post-preview from `global` in post-preview.svelte

  @import '../../styles/functions.scss';

  .series-preview {
    padding: calc(2 * var(--padding));
    @include readable();

    .content-list & {
      padding: 0;
    }

    .post-preview-list {
      list-style: none;
      margin: 0;
    }
  }
</style>

<article class='post-preview series-preview'>
  {#if !!title}
    {@html renderHeader()}
  {/if}
  <p class='post-preview__excerpt'>
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
    <a rel='prefetch' href={slug} class='post-preview__link'>
      See Posts
    </a>
  {/if}
  
</article>