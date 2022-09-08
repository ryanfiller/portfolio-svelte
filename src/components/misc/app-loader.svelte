<script>
  import { browser } from '$app/environment'

  const waitForLocalStorage = () => {
    if (!localStorage.getItem) {
      var timer = setTimeout(waitForLocalStorage, 1)
    }
    clearTimeout(timer)
    return
  }

	const localStoragePromise = new Promise((resolve) => {
		if (browser) {
			waitForLocalStorage()
			resolve()
		} else {
			resolve()
		}
	})
</script>

<!-- with nojs just render everything -->
<noscript>
  <slot />
</noscript>

<!-- globally await this so all components can access $user store freely -->
{#await localStoragePromise then}
  <slot />
{/await}