<style global type='text/scss'>
  @import '../../styles/functions.scss';
  
  .change {
    border: .125rem solid var(--colorPrimary);
    border-radius: .25rem;
    padding: calc(var(--padding)/2) var(--padding);
    margin-bottom: var(--padding);

    p {
      margin-bottom: 0;
  
      &:first-of-type,
      &:last-of-type {
        margin-bottom: 1em;
      }
    }

    details {
      summary {
        font-size: 1.125em;
        cursor: pointer;

        // hide default arrow
        list-style: none;
        &::-webkit-details-marker { display:none; }

        &::before{
          content: '';
          @include arrow;
          transition: var(--transitionSpeed);
          margin-right: .25em;
        }
      }

      &[open] {
        summary:before {
          transform: rotate(90deg);
        }
      }

      div > ul { // remark-custom-block inserts a div
        &:first-of-type { // top level ul only
          transition: var(--transitionSpeed);
          // TODO? - maybe make a border mixin
          border-left: .125rem solid var(--colorPrimary);
          list-style: none;
          margin-left: .185rem;
          padding-left: 1rem;
          padding-top: 1rem;
          font-weight: bold;

          ul {
            font-weight: normal;
            margin-top: 0;
            margin-bottom: 1rem;
          }

          p {
            margin-bottom: 0;
          }
        }
      }
    }
  }
</style>

<!-- TODO - refactor this to use 'callout' component -->

<section class='change'>
  <slot />
</section>