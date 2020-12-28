<script>
  export let segment

  import { stores } from '@sapper/app'
	const { page } = stores()
  import { markdown } from '../../stores.js'

  import Date from '../content/date.svelte'
  import TagList from '../content/tag-list.svelte'

  let root
  $: root = $page.path.split('/').filter(Boolean).length === 1

</script>

<style global type='text/scss'>
  @import '../../styles/functions.scss';

  :root {
    // for calc() division the right size number had to be unitless, * 1px everywhere to fix this
    --headerWidth: 1280;
    --headerHeight: 675;
    --headerAspectRatioHeight: calc(100vw * (var(--headerHeight) / var(--headerWidth)));
  }

  .banner-content {
    width: 100%;
    @include container;
    @include readable;

    h1 {
      margin: 0;
    }

    &[data-segment="blog"] {
      display: grid;
      gap: 1rem;
      grid-template-columns: auto ;
      grid-template-rows: auto ;
      grid-template-areas: "title"
                            "date"
                            "tags";

      h1 {
        grid-area: title;
        font-size: 4rem;
      }
  
      .date {
        grid-area: date;
        display: block;
      }

      .tag-list {
        grid-area: tags;
        display: block;
        align-self: end;
      }

      @include large {
        grid-template-columns: 1fr auto auto;
        grid-template-rows: 1fr auto auto;
        grid-template-areas: "title .    date"
                             "title tags tags";
      }
    }
  }

  .banner-image {
    margin: 0;
    position: relative;
    z-index: 1;
    overflow: hidden;
    grid-column: 1 / -1;
    grid-row: 1 / -1;
    height: 100%;
    min-height: calc(.66 * var(--headerAspectRatioHeight));
    // background: var(--pixelGrid);
    background-color: inherit;
    
    img {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center center;

      filter: grayscale(100%);
      opacity: .75;
      mix-blend-mode: overlay;
      margin: 0;
    }

    figcaption {
      font-size: 1rem;
      position: absolute;
      padding: .25em var(--padding) 1rem var(--padding);
      right: 0;
      bottom: 0;
    }

    // match --headerWidth
    @media (min-width: 1280px) {
      min-height: calc(.66 * 1px * var(--headerHeight));
      
      img {
        --margin: .5vw;
        margin: calc(-1 * var(--margin));
        width: calc(100% + (2 * var(--margin)));
        height: calc(100% + (2 * var(--margin)));
        filter: grayscale(100%) blur(calc(.0125 * (100vw - (1px * var(--headerWidth))))); // blur, but only a little
      }
    }
  }
</style>

<div
  id='page-banner'
  class='banner-content'
  data-root={!!root}
  data-segment={segment}
>
  <h1>
    {$markdown.title || segment}
  </h1>
  {#if $markdown.meta}
    {#if segment === 'blog' && !root}
      <Date date={$markdown.meta.date} />
    {/if}
    {#if (segment === 'blog' || segment === 'lab') && !root}
      <TagList
        categories={$markdown.meta.categories}
        tags={$markdown.meta.tags}
      />
    {/if}
  {/if}
</div>

{#if $markdown.banner}
  <figure class='banner-image'>
    <img
      src={`${$markdown.banner.src}?nf_resize=fit&w=100`}
      alt={$markdown.banner.alt}
      title={$markdown.banner.attribution}
    />
    {#if $markdown.banner.attribution}
      <figcaption>
        Image Credit: {$markdown.banner.attribution}
      </figcaption>
    {/if}
  </figure>
{/if}