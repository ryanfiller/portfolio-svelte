<script>
  export let post
  import Date from './date.svelte'
  import TagList from './tag-list.svelte'

  const { 
    title,
    slug, 
    meta: {
      date,
      excerpt,
      categories,
      tags
    } 
  } = post
</script>

<style global type='text/scss'>
  @import '../../styles/functions.scss';

  .post {
    @include readable();

    a {
      font-family: sans-serif;
      font-weight: bold;
      font-size: 1.25em;
      color: var(--colorHighlight);
      text-decoration: none;

      &:hover {
        text-decoration: underline;
        color: var(--colorActive);
      }
    }

    &__header {
      font-family: sans-serif;
      font-size: 1.25em;
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
      &::after {
        content: '»';
        margin-left: .25em;
      }
    }
  }
</style>

<article class='post'>
  <header class='post__header'>
    <a rel='prefetch' href={slug}>
      {title}
    </a>
  </header>
  <Date date={date} />
  <p class='post__excerpt'>
    {excerpt}
  </p>
  <TagList
    categories={categories}
    tags={tags}
  />
  <a rel='prefetch' href={slug} class='post__link'>
      Read
  </a>
</article>