<script>
  import { socialLinks as links } from '../../config.js'

  import Email from '../../../static/images/site-assets/icons/social/email.svg'
  import Twitter from '../../../static/images/site-assets/icons/social/twitter.svg'
  import Instagram from '../../../static/images/site-assets/icons/social/instagram.svg'
  import LinkedIn from '../../../static/images/site-assets/icons/social/linkedin.svg'
  import GitHub from '../../../static/images/site-assets/icons/social/github.svg'
  import CodePen from '../../../static/images/site-assets/icons/social/codepen.svg'
  import PokemonGO from '../../../static/images/site-assets/icons/social/pokemongo.svg'

  const icons = {
    email: Email,
    twitter: Twitter,
    instagram: Instagram,
    linkedin: LinkedIn,
    github: GitHub,
    codepen: CodePen,
    pokemongo: PokemonGO
  }
</script>

<style global>
  .social-list {
    list-style: none;
    margin-left: 0;
    display: flex;
    font-size: 1em;
  }

  .social-list__link {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 !important;
    padding: .25em;
  }
  
  .social-list__link svg {
    fill: var(--colorWhite);
    height: 1em;
    width: 1em;
  }

  .social-list__item:hover a {
    background-color: currentColor;
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
          <svelte:component this={icons[link.name]}/>
        </a>
      {:else}
        <a
          href={link.url}
          title={link.text}
          class='social-list__link'
          target='_blank' rel='noopener noreferrer'
          style='color: {link.color};'
        >
          <svelte:component this={icons[link.name]}/>
        </a>
      {/if}
    </li>
  {/each}
</ul>