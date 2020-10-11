<script>
  export let segment
  export let label = ''
  export let links = []

</script>

<style global type='text/scss'>
  @import '../../styles/functions.scss';

  .nav {
    header & {
      display: flex;
      flex-direction: column;
      align-items: center;

      .logo {
        margin-bottom: 1rem;
      }

      @include small() {
        flex-direction: row;
        justify-content: space-between;
        flex-wrap: wrap;

        .logo {
          margin-bottom: 0;
        }
      }
    }

    &__list {
      display: flex;
      list-style: none;
      padding: 0;
      margin: 0;

      &-item {
        margin-bottom: 0;
        margin-right: 1em;

        &:last-child {
          margin-right: 0;
        }
      }
    }

    &__link {
      color: currentColor;

      &--active {
        position: relative;

        &:after {
          content: '';
          display: block;
          @include arrow(up);
          position: absolute;
          top: calc(100% + .125em);
          left: 50%;
          transform: translateX(-50%);
        }
      }
    }
  }
</style>

<!-- TODO? rel=prefetch on any of these? -->

<nav class='nav' aria-label={label}>
  <slot />
  <ul class='nav__list'>
    {#each links as link}
      <li class='nav__list-item'>
        {#if link.external}
          <a 
            href={link.url}
            class='nav__link'
            target='_blank' rel='noopener noreferrer'
          >
            {link.name}
          </a>
        {:else}
          <a 
            href={`/${link.url}`}
            class={link.url === segment ? 'nav__link nav__link--active' : 'nav__link'}
          >
            {link.name}
          </a>
        {/if}
      </li>
    {/each}
  </ul>
</nav>
