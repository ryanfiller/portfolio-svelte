<script>
  import { onMount } from 'svelte'

  import Page from './page.svelte'
  import Markdown from '../components/layout/markdown.svelte'
  import Alert from '../components/misc/alert.svelte'
  import { user } from '../stores/user.js'

  $$props.meta.date = null

  const alertContent = `
    <p>
      Some features in the section require JavaScript, might not work great on mobile, and may not have been thoroughly tested.
      <br />
      If you find a bug you can <a href='https://github.com/ryanfiller/portfolio-svelte/issues'>report it</a>.
      <br />
      <br />
      Procede anyways?
    </p>
  `
  
  let showAlert
  onMount(() => {
		if(!$user.labAlert || ($user.labAlert.show !== false && $user.labAlert.id !== btoa(alertContent))) {
      showAlert = true
    }
	})

  const closeAlert = () => { 
    showAlert = false
    $user.labAlert = {
      show: false,
      id: btoa(alertContent)
    }
  }
</script>

<Page {...$$props} >
  <Markdown>
    <slot />
  </Markdown>

  <Alert
    title='Caution!'
    show={showAlert}
    slot='alert'
  >
    {@html alertContent}
    <svelte:fragment slot='actions'>
      <button on:click={() => closeAlert()}>
        That's okay.  
      </button>
      <button on:click={() => history.back()}>
        No, go back.
      </button>
      <a href='/' class='button'>
        No, go to homepage.
      </a>
    </svelte:fragment>
  </Alert>
  
</Page>

