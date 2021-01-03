<script>
  export let segment

  import { secondaryNav } from '../../config.js'
  import Nav from './nav.svelte'
  import SocialLinks from './social-links.svelte'
</script>

<style global type='text/scss'>
  @import '../../styles/functions.scss';

  .footer {
    font-size: 1em;
    color: var(--colorWhite);
    background: var(--colorPrimary);
    
    &__content {
      padding-top: 1rem;
      @include container;
      font-weight: bold;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;

      & > * {
        margin-bottom: 1rem;
      }
    
      a {
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
  <div class='footer__content'>
    <span>
      Built with
      <a href='https://sapper.svelte.dev/' target='_blank' rel='noopener noreferrer'>
        Sapper
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