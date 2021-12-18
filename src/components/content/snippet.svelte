<script>
  import { slugify } from '$helpers'
  export let content = {}
  export let h = 2
  import Date from '../content/date.svelte'
  import TagList from '../content/tag-list.svelte'

  const {
    title,
    series,
    slug,
    meta : {
      date,
      categories,
      tags,
      excerpt
    },
    posts
  } = content

  const renderHeader = () => `
    <h${h} class='header'>
      <a rel='prefetch' href=${slug}>
        ${series 
          ? `<span class='series-header'>${series}: </span> ${title}` 
          : title
        }
      </a>
    </h${h}>
  `
</script>

<style>
  /* .snippet {
    & :global(.header) {
      
    }

    & a,
    & :global(a) {

    }

    & a:hover,
    & a:focus,
    & :global(a:hover),
    & :global(a:focus) {

    }
  } */

  
</style>

<article class='snippet'>
  {@html renderHeader()}
  <Date date={date} />
  <TagList
    categories={categories}
    tags={tags}
  />

  {#if excerpt}
    <p>
      {excerpt}
    </p>
  {/if}

  {#if posts}
    <ul>
      {#each posts as post}
        <li>
          <a rel='prefetch' href={post.slug}>
            {post.title}
          </a>
        </li>
      {/each}
    </ul>
  {/if}

  <a rel='prefetch' href={slug}>
    Read
  </a>
  {#if series}
    <a rel='prefetch' href={`/blog/series/${slugify(series)}`}>
      More of the {series} series
    </a>
  {/if}
</article>
