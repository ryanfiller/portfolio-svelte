<script lang="typescript">
  export let boundElements: Array<HTMLElement>

  import { onMount } from 'svelte'
  import { mainNav as links } from '$site-config'

  let navInRightDrawer = false

  onMount(() => {
    // TODO - should this use the helper
    const navSwitchSize = getComputedStyle(document.documentElement).getPropertyValue(`--nav-switch-size`)

    const isNavSize = matchMedia(`(min-width: ${navSwitchSize})`)

    navInRightDrawer = !isNavSize.matches
    isNavSize.addEventListener('change', () => {
      navInRightDrawer = !isNavSize.matches
    })
  })
</script>

<!-- header.svelte needs these to set some grid values -->
<svelte:head>
  {@html `
    <style>
      :root {
        --main-navigation-count: ${links.length};
        --main-navigation-length: ${links.map(link => link.name).join(' ').length};
      }
    </style>
  `}
</svelte:head>

<nav
  aria-label="main navigation"
  id="main-navigation"
>
  <ul>
    {#each links as link, index}
      <li>
        {#if navInRightDrawer}
          <a
            href="{link.url || `/${link.name}`}"
            bind:this={boundElements[index]}
            data-right-drawer={navInRightDrawer}
          >
          {link.name}
          </a>
        {:else}
          <a
            href="{link.url || `/${link.name}`}"
            data-right-drawer={navInRightDrawer}
          >
            {link.name}
          </a>
        {/if}
      </li>
    {/each}
  </ul>
</nav>

<style lang="postcss">
  nav {
    padding: 0 var(--gap);
    transition: var(--transition-speed);
    transition-timing-function: var(--transition-timing);
    font-family: var(--font-display);
    font-variation-settings: "wght" 500, "wdth" 125, "YOPQ" 70;
    
    & ul {
      display: flex;
      flex-direction: column;
      gap: 0.5em;
      padding: 0;
      margin: 0;
      list-style: none;
    }

    @media (--nav-switch-width) {
      padding: 0;

      & ul {
        padding: 0;
        block-size: var(--logo-height);
        flex-direction: row;
        align-items: center;
        gap: var(--gap);
      }
    }
  }
</style>
