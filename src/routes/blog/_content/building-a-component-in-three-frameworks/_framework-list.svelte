<style global> 
  .framework-list {
    --iconSize: 2rem;

    & ul {
      margin-left: 0;
      padding-left: 2rem;

      & pre > code {
        padding-left: calc(var(--padding) + 2rem) !important;
      }

      & > li {
        list-style: none;
        position: relative;
        margin-bottom: 0;

        & + li {
          margin-top: 2em;
        }

        & > p:first-child {
          margin-top: calc(-1 * var(--iconSize));  /* move the first paragraph up */
        }

        &::before {
          content: '';
          display: block;
          height: var(--iconSize);
          width: var(--iconSize);
          background-size: contain;
          background-position: center center;
          background-repeat: no-repeat;
          position: sticky;
          top: calc(0.5 * var(--iconSize));
          transform: translateX(calc(-1.5 * var(--iconSize)));
        }

        &.react::before {
          background-image: url('/images/react-logo.svg');
        }

        &.svelte::before {
          background-image: url('/images/svelte-logo.svg');
        }

        &.vue::before {
          background-image: url('/images/vue-logo.svg');
        }
      }
    }
  }
</style>

<section class='framework-list'>
  <ul>
    <slot />
  </ul>
</section>