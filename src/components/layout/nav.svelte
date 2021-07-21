<script>
  export let segment
  export let label = ''
  export let links = []
</script>

<style>
  :global(header) nav {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  ul {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;

    & li {
      margin-bottom: 0;
      margin-right: 1em;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  a {
    color: currentColor;
    text-decoration: none;

    &.active {
      position: relative;

      &::after {
        content: '';
        display: block;
        position: absolute;
        top: calc(100% + .125em);
        left: 50%;
        transform: translateX(-50%);
        font-size: 1em;
        width: 0;
        height: 0;
        border-left: .3em solid transparent;
        border-right: .3em solid transparent;
        border-bottom: .4em solid currentColor;
      }
    }
  }
</style>

<!-- TODO? rel=prefetch on any of these? -->

<nav class='nav' aria-label={label}>
  <ul>
    {#each links as link}
      <li>
        {#if link.external}
          <a 
            href={link.url}
            target='_blank' rel='noopener noreferrer'
          >
            {link.name}
          </a>
        {:else}
          <a 
            href={`/${link.url}`}
            class:active={link.url === segment}
          >
            {link.name}
          </a>
        {/if}
      </li>
    {/each}
  </ul>
</nav>
