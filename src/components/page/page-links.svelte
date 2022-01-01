<script>
  export let first = true
  export let links
  import focusLink from '$actions/focus-link.js'
</script>

<style>
  nav {
    display: block;
    background: var(--pixelBorder);
    padding: var(--padding);

    & a {
      color: currentColor;
      display: block;
      text-decoration: none;
      padding-left: calc(1.5 * var(--arrow-size));
    }

    & a::before {
      position: absolute;
      top: .25em;
      left: 0;
    }

    & ul {
      margin: 0;
      padding: 0;
      padding: 0;
      list-style: none;

      & ul {
        padding-left: 1em;
      }
    }

    & li,
    & a {
      margin: 0.75em 0;
    }
  }
</style>

{#if first}
  <nav>
    <ul>
      {#each links as link}
        <li>
          <a
            class='flip-arrow'
            href={link.hash}
            use:focusLink
          >
            {link.content}
          </a>
          {#if link.children}
            <svelte:self
              links={link.children}
              first={false}
            />
          {/if}
        </li>
      {/each}
    </ul>
  </nav>
{:else}
  <ul>
    {#each links as link}
      <li>
        <a class='flip-arrow' href={link.hash}>{link.content}</a>
        {#if link.children}
          <svelte:self
            links={link.children}
            first={false}
          />
        {/if}
      </li>
    {/each}
  </ul>
{/if}
