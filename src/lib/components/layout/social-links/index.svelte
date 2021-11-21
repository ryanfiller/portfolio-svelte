<script>
  import { socialLinks as links } from '$lib/site-config.js'

  import Email from './email.svg?raw'
  import Twitter from './twitter.svg?raw'
  import Instagram from './instagram.svg?raw'
  import LinkedIn from './linkedin.svg?raw'
  import GitHub from './github.svg?raw'
  import CodePen from './codepen.svg?raw'
  import PokemonGO from './pokemongo.svg?raw'
  import RSS from './rss.svg?raw'

  const icons = {
    email: Email,
    twitter: Twitter,
    instagram: Instagram,
    linkedin: LinkedIn,
    github: GitHub,
    codepen: CodePen,
    pokemongo: PokemonGO,
    rss: RSS
  }
</script>

<style>
  ul {
    list-style: none;
    margin: 0;
    padding: 0 var(--padding);
    display: flex;
    font-size: 1em;
  }

  li {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 !important;
    padding: 0.25em;
  }

  li :global(svg) {
    fill: var(--colorWhite);
    height: 1em;
    width: 1em;

    &:hover a {
      background-color: currentColor;
    }
  }
</style>

<ul class='social-list'>
  {#each links as link}
    <li class='social-list__item'>
      {#if link.name === 'email'}
        <a
          href={link.url}
          title={link.text}
          class='social-list__link'
          style='color: {link.color};'
        >
          {@html icons[link.name]}
        </a>
      {:else}
        <a
          href={link.url}
          title={link.text}
          class='social-list__link'
          target='_blank' rel='noopener noreferrer'
          style='color: {link.color};'
        >
          {@html icons[link.name]}
        </a>
      {/if}
    </li>
  {/each}
</ul>