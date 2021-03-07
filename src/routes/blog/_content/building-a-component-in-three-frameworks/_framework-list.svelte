<style global type='text/scss'> 
  .framework-list {
    --iconSize: 2rem;

    ul {
      margin-left: 0;
      padding-left: 2em;
    
      & > li {
        list-style: none;
        position: relative;
        margin-bottom: 0;
    
        + li {
          margin-top: 2em;
        }

        & > p:first-child {
          margin-top: calc(-1 * var(--iconSize)); // move the first paragraph up
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
          top: calc(.5 * var(--iconSize));
          transform: translateX(calc(-1.5 * var(--iconSize)));
        }
    
        &:nth-child(1):before {
          background-image: url('/images/react-logo.svg');
        }
    
        &:nth-child(2):before {
          background-image: url('/images/svelte-logo.svg');
        }
    
        &:nth-child(3):before {
          background-image: url('/images/vue-logo.svg');
        }
      }
    }
  }
</style>

<section class='framework-list'>
  <slot />
</section>