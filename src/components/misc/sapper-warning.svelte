<script>
  import Note from './note.svelte'
</script>

<style>
  /* styles approximated from sapper.svelte.dev */
  blockquote {
    --colorSapperGreen: rgb(21, 151, 148);
    --colorSapperBlue: #40b3ff;
    color: var(--colorSapperBlue);
    border: 2px solid var(--colorSapperBlue) !important;
    background: white;
    margin: 1.6rem 0 2.4rem;
    padding: 2rem 2.4rem 1.8rem 2.4rem;
    border-radius: .4rem;
    font: 'Overpass', sans-serif;
    font-size: 1.5rem;
    line-height: 1.5;
    font-weight: 300;

    & p {
      margin: 1em 0;
      font-size: 1.8rem;
    }
  
    & a {
      text-decoration: none;
      cursor: pointer;
      padding: 0 0 1px 0;
      border-bottom: 1px solid currentColor;
      user-select: none;
      color: var(--colorSapperGreen);
      transition: color .2s, border .2s, padding .2s;
  
      &:hover,
      &:focus {
        color: var(--colorSapperBlue);
        padding: 0;
        border-bottom: 2px solid currentColor;
      }
    }
  }

</style>

<!-- target='_blank' rel='noopener noreferrer' -->

<Note title='SvelteKit is finally available!'>
  A quick <a href='https://sapper.svelte.dev/docs#Before_we_begin'>note from the Svelte Team</a> on starting a new project with Sapper:

  <blockquote>
    <p>
      Sapper's succesor, <a href='`https://kit.svelte.dev'>SvelteKit</a>, is currently available for use. All development efforts moving forward will be focused on <a href='https://kit.svelte.dev'>SvelteKit</a>.
    </p>
    <p>
      If you get stuck, reach out for help in the <a href='https://svelte.dev/chat'>Discord chatroom</a>. See the <a href='migrating' rel='noopener noreferrer'>migration guides</a> for help upgrading from older versions.
    </p>
  </blockquote>

  The information in this post <em>might</em> still apply to <a href='https://kit.svelte.dev'>SvelteKit</a>, but its likely to be different. I would reccomend not starting a new project in <a href='https://sapper.svelte.dev/docs'>Sapper</a> at this point.
</Note>