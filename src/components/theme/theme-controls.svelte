<!-- TODO maybe - add writing mode to theme controls -->

<script>
  import Theme from './temp-theme.svelte'

  import { onMount } from 'svelte'
  import user from '$stores/user.js'

  const THEME_ATTR = 'data-user-theme'
  const CONTRAST_ATTR = 'data-user-contrast'
  const WRITING_MODE_ATTR = 'data-user-writing-mode'

  const resolveInitialUserTheme = (user, window, THEME_ATTR, CONTRAST_ATTR, WRITING_MODE_ATTR) => {
    const theme = user && user.theme ? user.theme : window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    const contrast = user && user.contrast ? user.contrast : window.matchMedia('(prefers-contrast: more)').matches ? 'more' : 'no-preference'
    const writingMode = user && user.writingMode ? user.writingMode : 'horizontal-tb'

    window.document.documentElement.setAttribute(THEME_ATTR, theme)
    window.document.documentElement.setAttribute(CONTRAST_ATTR, contrast)
    window.document.documentElement.setAttribute(WRITING_MODE_ATTR, writingMode)
  }

  const changeTheme = event => {
    const theme = event.target.value
    $user.theme = theme
    window.document.documentElement.setAttribute(THEME_ATTR, theme)
  }

  const changeContrast = event => {
    const contrast = event.target.checked ? 'more' : 'no-preference'
    $user.contrast = contrast
    window.document.documentElement.setAttribute(CONTRAST_ATTR, contrast)
  }

  const changeWritingMode = event => {
    const writingMode = event.target.value
    $user.writingMode = writingMode
    window.document.documentElement.setAttribute(WRITING_MODE_ATTR, writingMode)
  }

  onMount(() => {
    // keep in sync with OS preference changes
    window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (event) => {
        const newTheme = event.matches ? 'dark' : 'light'
        if ($user.theme === 'auto') { // don't overwrite a set theme with the OS theme
          window.document.documentElement.setAttribute(THEME_ATTR, newTheme)
        }
      })

    window.matchMedia('(prefers-contrast: more)')
      .addEventListener('change', (event) => {
        const newContrast = event.matches ? 'more' : 'no-preference'
        if ($user.contrast === 'no-preference') { // don't overwrite a set contract with the OS contract
          window.document.documentElement.setAttribute(CONTRAST_ATTR, newContrast)
        }
      })
  })
</script>

<svelte:head>
  {@html `
    <${'script data-theme-controls-js'}>
      var THEME_ATTR = '${THEME_ATTR}'
      var CONTRAST_ATTR = '${CONTRAST_ATTR}'
      var WRITING_MODE_ATTR = '${WRITING_MODE_ATTR}'
      var resolveInitialUserTheme = ${resolveInitialUserTheme.toString()}

      var user = localStorage.getItem('user')
      resolveInitialUserTheme(JSON.parse(user), window, THEME_ATTR, CONTRAST_ATTR, WRITING_MODE_ATTR)
    </${'script'}>
  `}
</svelte:head>

<style>
  fieldset {
    margin: 0;
    border: 0;
    padding: 0;
  }
</style>

<fieldset id='theme-controls' class='needs-js'>
  <label for='theme'>
    theme
    <select
      name='theme'
      id='theme'
      value={$user.theme || 'auto'}
      on:change={changeTheme}
    >
      {#each ['auto', 'light', 'dark'] as theme}
        <option>{theme}</option>
      {/each}
    </select>
  </label>

  <!-- ['no-preference', 'more', 'less'] -->
  <label for='contrast'>
    mono
    <input
      type='checkbox'
      id='contrast'
      name='contrast'
      checked={$user.contrast === 'more'}
      on:change={changeContrast}
    />
  </label>

  <!-- <label for='writing-mode'>
    writing-mode
    <select
      name='writing-mode'
      id='theme'
      value={$user.writingMode || 'horizontal-tb'}
      on:change={changeWritingMode}
    >
      {#each ['horizontal-tb', 'vertical-lr', 'vertical-rl'] as mode}
        <option>{mode}</option>
      {/each}
    </select>
  </label> -->
</fieldset>

<Theme />
