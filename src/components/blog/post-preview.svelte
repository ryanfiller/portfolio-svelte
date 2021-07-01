<script>
  export let h = '2'
  export let title = ''
  export let series = ''
  export let slug = ''
  export let meta = {}

  import Date from '../content/date.svelte'
  import TagList from '../content/tag-list.svelte'

  const renderHeader = () => `
    <h${h} class='header'>
      <a rel='prefetch' href=${slug}>
        ${!!series 
          ? `<span class='series-header'>${series}: </span> ${title}` 
          : title
        }
      </a>
    </h${h}>
  `
</script>

<style>
  .post-preview,
  :global(.series-preview) { /* TODO this should abstract better and not inherit like this */
    & :global(a) {
      font-family: sans-serif;
      font-weight: bold;
      color: var(--colorHighlight);
      text-decoration: none;

      &:hover {
        text-decoration: underline;
        color: var(--colorActive);
      }
    }

    & :global(.header) {
      font-family: sans-serif;
      font-size: 1.5em;
      font-weight: bold;
      margin-bottom: .5rem;
    }

    & :global(.series-header) {
      display: block;
      font-size: .75em;
    }

    & :global(.date) {
      font-weight: bold;
      margin-bottom: .75rem;
    }

    & .excerpt {
      margin-bottom: .5rem;
    }

    & :global(.tag-list) {
      font-weight: bold;
      margin-bottom: .5rem;
    }

    & .link {
      font-size: 1.25em;
      &::after {
        content: '»';
        margin-left: .25em;
      }
    }
  }
</style>

<article class='post-preview'>
  {@html renderHeader()}
  <Date date={meta.date} />
  <p class='excerpt'>
    {meta.excerpt}
  </p>
  <TagList
    categories={meta.categories}
    tags={meta.tags}
  />
  <a rel='prefetch' href={slug} class='link'>
    Read
  </a>
</article>