<script>
  export let segment = ''
  export let title = ''
  export let meta = {}
  export let banner = {}

  import { capitalize } from '$lib/helpers'

  import Date from '../content/date.svelte'
  import TagList from '../content/tag-list.svelte'
</script>

<style>
  :root {
    /* for calc() division the right size number had to be unitless, * 1px everywhere to fix this */
    --headerWidth: 1280;
    --headerHeight: 675;
    --headerAspectRatioHeight: calc(100vw * (var(--headerHeight) / var(--headerWidth)));
  }

  #page-banner {
    grid-area: content;
    margin-top: calc(2 * var(--padding));
    margin-bottom: calc((2 * var(--padding)) + 2rem);

    /* include container */
    padding-left: var(--padding);
    padding-right: var(--padding);
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    /* include readable */
    max-width: var(--readableMax);
    grid-template-columns: auto;
    grid-template-rows: auto;
    grid-template-areas: "title";

    & h1 {
      margin: 0;
      grid-area: title;
      font-size: 4rem;
    }

    &[data-segment="blog"],
    &[data-segment="series"] {
      display: grid;
      gap: 1rem;
      grid-template-areas:
        "title"
        "date"
        "tags";

      & :global(.date) {
        grid-area: date;
        display: block;
      }

      & :global(.tag-list) {
        grid-area: tags;
        display: block;
      }
    }

    @media (--largeWidth) {
      &[data-segment="blog"],
      &[data-segment="series"] {
        grid-template-columns: 1fr auto auto;
        grid-template-rows: 1fr auto auto;
        grid-template-areas:
          "title .    date"
          "title tags tags";

        & :global(.date),
        & :global(.tag-list) {
          text-align: right;
        }
      }
    }
  }

  figure {
    margin: 0;
    position: relative;
    z-index: 1 !important;
    overflow: hidden;
    grid-column: 1 / -1;
    grid-row: 1 / -1;
    height: 100%;
    min-height: calc(0.66 * var(--headerAspectRatioHeight));
    /* background: var(--pixelGrid); */
    background-color: inherit;

    & img {
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
      opacity: 0.75;
      mix-blend-mode: overlay;
      margin: 0;
    }

    & figcaption {
      font-size: 1rem;
      position: absolute;
      padding: 0.25em var(--padding) 1rem var(--padding);
      right: 0;
      bottom: 0;
    }

    /* match headerWidth */
    @media (min-width: 1280px) {
      min-height: calc(0.66 * 1px * var(--headerHeight));

      & img {
        --margin: 0.5vw;

        margin: calc(-1 * var(--margin));
        width: calc(100% + (2 * var(--margin)));
        height: calc(100% + (2 * var(--margin)));
        filter: grayscale(100%) blur(calc(0.0125 * (100vw - (1px * var(--headerWidth)))));
      }
    }
  }
</style>

<div
  id='page-banner'
  class='columns'
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

  <slot />

</div>

{#if banner.src}
  <figure>
    <img
      src={`${banner.src}?nf_resize=fit&w=1280`}
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
