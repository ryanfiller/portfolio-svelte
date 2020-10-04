<script>
  export let post
  import Meta from './meta.svelte'

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
      color: var(--colorPrimary);
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }

    &__header{
      font-family: sans-serif;
      font-size: 1.25em;
      font-weight: bold;
      margin-bottom: .5rem;
    }

    &__date{
      opacity: .75;
      font-weight: bold;
      margin-bottom: .75rem;
    }

    &__excerpt{
      margin-bottom: .5rem;
    }

    &__tags{
      opacity: .75;
      font-weight: bold;
      margin-bottom: .5rem;
    }

    &__link{
      &:after {
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
  <Meta
    className='post__date'
    date={date}
  />
  <p class='post__excerpt'>
    {excerpt}
  </p>
  <Meta 
    className='post__tags'
    categories={categories}
    tags={tags}
  />
  <a rel='prefetch' href={slug} class='post__link'>
      Read
  </a>
</article>