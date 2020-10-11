<script>
  export let segment

  import Default from './banners/default.svelte'
  import Blog from './banners/blog.svelte'
  import Lab from './banners/lab.svelte'

  import { stores } from '@sapper/app'
	const { preloading, page } = stores()
  import { markdown } from '../../stores.js'

  let isRoot
  $: isRoot = $page.path.split('/').filter(Boolean).length === 1

</script>

<style global type='text/scss'>
  @import '../../styles/functions.scss';

  .banner {
    width: 100%;
    background-color: var(--colorPrimary);

    &__content {
      padding: var(--padding);
      @include container;
      @include readable;
      position: relative;
      z-index: 2;
    }

    &__title {
      margin: 0;
    }

    &--blog {
      .banner__title {
        margin-bottom: calc(1.5 * var(--padding));
      }

      .banner__date {
        margin-bottom: calc(1 * var(--padding));
      }

      @include large {
        .banner__content {
          // max-width: 100%;
          display: grid;
          grid-template-columns: 1fr auto auto;
          grid-template-rows: 1fr auto;
          grid-template-areas:
            "title title date"
            "title title tags";

          & > * {
            margin-bottom: 0;
          }

          .banner__title {
            grid-area: title;
            font-size: 4rem;
          }
      
          .banner__date {
            grid-area: date;
            align-self: start;
            justify-self: flex-end;
          }

          .banner__tags {
            grid-area: tags;
            justify-self: flex-end;
          }
        }
      }

      .banner__image {
        position: absolute;
        z-index: 1;
        width: 100%;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        overflow: hidden;
        
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center center;
          image-rendering: crisp-edges;
        }
      }
    }
  }
</style>


{#if isRoot}
  <Default title={segment} />
{:else if Object.keys($markdown).length}
  {#if segment === 'blog'}
    <Blog {...$markdown} />
  {:else if segment === 'lab'}
    <Lab {...$markdown} />
  {/if}
{/if}
