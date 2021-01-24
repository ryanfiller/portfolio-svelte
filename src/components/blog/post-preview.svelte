<script>
  export let h = '2'
  export let title = ''
  export let slug = ''
  export let meta = {}

  import Date from '../content/date.svelte'
  import TagList from '../content/tag-list.svelte'

  const renderHeader = () => `
    <h${h} class='post-preview__header'>
      <a rel='prefetch' href=${slug}>
        ${title}
      </a>
    </h${h}>
  `
</script>

<style global type='text/scss'>
  .post-preview {
    a {
      font-family: sans-serif;
      font-weight: bold;
      color: var(--colorHighlight);
      text-decoration: none;

      &:hover {
        text-decoration: underline;
        color: var(--colorActive);
      }
    }

    &__header {
      font-family: sans-serif;
      font-size: 1.5em;
      font-weight: bold;
      margin-bottom: .5rem;
    }

    .date {
      font-weight: bold;
      margin-bottom: .75rem;
    }

    &__excerpt {
      margin-bottom: .5rem;
    }

    &__tags {
      font-weight: bold;
      margin-bottom: .5rem;
    }

    &__link {
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
  <p class='post-preview__excerpt'>
    {meta.excerpt}
  </p>
  <TagList
    categories={meta.categories}
    tags={meta.tags}
  />
  <a rel='prefetch' href={slug} class='post-preview__link'>
    Read
  </a>
</article>