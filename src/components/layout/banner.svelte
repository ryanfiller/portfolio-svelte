<script>
  export let segment = ''
  export let title = ''
  export let meta = {}
  export let banner = {}

  import { capitalize } from '../../helpers'

  import Date from '../content/date.svelte'
  import TagList from '../content/tag-list.svelte'
</script>

<style global type='text/scss'>
  @import '../../styles/functions.scss';

  :root {
    // for calc() division the right size number had to be unitless, * 1px everywhere to fix this
    --headerWidth: 1280;
    --headerHeight: 675;
    --headerAspectRatioHeight: calc(100vw * (var(--headerHeight) / var(--headerWidth)));
  }

  .banner {
    grid-area: content;
    width: 100%;
    margin-top: calc(2 * var(--padding));
    margin-bottom: calc((2 * var(--padding)) + 2rem);
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

    &-image {
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
  }
</style>

<div
  id='page-banner'
  class='banner'
  data-segment={segment}
>
  <h1>
    {title || capitalize(segment)}
  </h1>
  {#if meta.date}
    <Date date={meta.date} />
  {/if}
  {#if meta.categories || meta.tags}
    <TagList
      categories={meta.categories}
      tags={meta.tags}
    />
  {/if}
</div>

{#if banner.src}
  <figure class='banner-image'>
    <img
      src={`${banner.src}?nf_resize=fit&w=100`}
      alt={banner.alt}
      title={banner.attribution}
    />
    {#if banner.attribution}
      <figcaption>
        Image Credit: {banner.attribution}
      </figcaption>
    {/if}
  </figure>
{/if}