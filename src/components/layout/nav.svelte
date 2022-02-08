<script>
  export let segment
  export let label = ''
  export let links = []

  import { onMount } from 'svelte';
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'

  import layout from '$stores/layout.js'
  import { getCustomProperty } from '$helpers'

  console.log('page', $page)

  // TODO contact form stuff
  async function navigate(event) {
    event.preventDefault()
    const { href, hash, dataset } = event.target

    if (dataset.action && hash) {
      $layout.naviconOpen = true
      $layout.navAction = dataset.action
      window.location.hash = hash
    } else {
      await goto(href)
        .then(() => $layout.naviconOpen = false)
        .catch(() => goto('/404?'))
    }
  }

  // take itself out of the tabIndex when its visually out of the drawer
  // this is specifically for the header nav instance, not the footer nav instance
  let navSize
  let skipFocusTrap = 'true' // important to default to true
  onMount(() => {
    navSize = getCustomProperty('navSize')
    const navBreak = window.matchMedia(`(min-width: ${navSize})`);

    navBreak.addEventListener('change', () => {
      skipFocusTrap = navBreak.matches
    })

    // TODO  - there's probably a better way to handle this, I dunno...
    if (window.location.hash === '#contact') {
      $layout.naviconOpen = true
    }
  })

</script>

<style>
  /* :global(header) ul {
    font-size: 2em;
    flex-direction: column;
    align-items: center;
  } */

  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: end;
    gap: 1em;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  a {
    color: currentColor;
    text-decoration: none;

    /* &.active {
      position: relative;

      &::after {
        content: '';
        display: block;
        position: absolute;
        top: calc(100% + 0.125em);
        left: 50%;
        transform: translateX(-50%);
        font-size: 1em;
        width: 0;
        height: 0;
        border-left: 0.3em solid transparent;
        border-right: 0.3em solid transparent;
        border-bottom: 0.4em solid currentColor;
      }
    } */
  }
</style>

<!-- TODO? rel=prefetch on any of these? -->

<nav
  class='nav'
  aria-label={label}
>
  <ul>
    {#each links as link}
      <li>
        {#if link.external}
          <a
            href={link.url}
            target='_blank'
            rel='noopener noreferrer'
            data-skip-focus-trap={skipFocusTrap}
          >
            {link.name}
          </a>
        {:else}
          <a
            on:click={navigate}
            href={`${link.url}`}
            data-action={link.action}
            class:needs-js={!!link.action}
            class:active={link.url === segment}
            data-skip-focus-trap={skipFocusTrap}
          >
            {link.name}
          </a>
        {/if}
      </li>
    {/each}
  </ul>
</nav>
