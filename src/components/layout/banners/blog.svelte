<script>
  export let title
  export let meta
  export let banner

  import Meta from '../../content/meta.svelte'
</script>

<section class='banner banner--blog'>
  <div class='banner__content'>
    <h1 class='banner__title'>
      {title}
    </h1>
    <Meta className='banner__date' date={meta.date} />
    <Meta className='banner__tags' categories={meta.categories} tags={meta.tags} />
  </div>
  <!-- TODO -->
  <!-- {banner && 
    <picture 
      class='banner__image'
    >
      <img
        src={`https://ryanfiller.com${banner.url}?nf_resize=fit&w=100`}
        alt={banner.alt}
      />
    </picture>
  } -->
</section>