<script>
  export let title
  export let meta

  import Meta from '../../content/meta.svelte'
</script>

<section class='banner banner--lab'>
  <div class='banner__content'>
    <h1 class='banner__title'>
      {title}
    </h1>
    <Meta className='banner__tags' tags={meta.tags} />
  </div>
</section>