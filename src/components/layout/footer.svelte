<script>
  export let segment

  import { secondaryNav } from '../../site-config.js'
  import Nav from './nav.svelte'
</script>

<style global type='text/scss'>
  @import '../../styles/functions.scss';

  .footer {
    --background: var(--colorPrimary);
    --text: var(--colorLight);
    font-size: 1rem;
    background: var(--background);
    color: var(--text);
    
    &__content {
      padding: .5rem;
      @include container;
      font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
      font-weight: bold;
      display: flex;
      justify-content: space-between;
    
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
          Netlfy
        </a>
      </span>
      <Nav
        segment={segment}
        links={secondaryNav}
        label='utility navigation'
      />
    </div>
  </footer>