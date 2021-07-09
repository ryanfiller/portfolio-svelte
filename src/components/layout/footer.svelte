<script>
  export let segment

  import { secondaryNav } from '../../config.js'
  import Nav from './nav.svelte'
  import SocialLinks from './social-links.svelte'
</script>

<style global>
  .footer {
    font-size: 1em;
    color: var(--colorWhite);
    background: var(--colorPrimary);
    
    & div {
      font-weight: bold;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;

      & span,
      & :global(ul),
      & :global(nav) {
        margin: 1rem var(--padding);
      }
    
      & a {
        text-decoration: none;
        color: currentColor;
        margin: 0 .25em;
        
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
</style>



<footer
  id='site-footer'
  class='footer'
>
  <div>
    <span>
      Built with
      <a href='https://kit.svelte.dev/' target='_blank' rel='noopener noreferrer'>
        Svelte
      </a>
        and hosted on
      <a href='https://www.netlify.com/' target='_blank' rel='noopener noreferrer'>
        Netlify
      </a>
    </span>

    <SocialLinks />

    <Nav
      segment={segment}
      links={secondaryNav}
      label='utility navigation'
    />

  </div>
</footer>