<script>
  import { onMount } from 'svelte'
  import { browser } from '$app/environment'

  import Chart from 'color-contrast-table-svelte'

  import { colors, themes } from '$styles/config.js'
  import user from '$stores/user.js'

  import { capitalize, getCustomProperty, setCustomProperty } from '$helpers'

  function nameColorVariable(color) {
    return `color${capitalize(color)}`
  }

  function formatColorArray(colors) {
    return Object.keys(colors).map(key => {
      if (typeof colors[key] === 'object') {
        return {
          name: key,
          color: colors[key].name,
          value: colors[key].value
        }
      } else {
        return {
          name: key,
          color: key,
          value: colors[key]
        }
      }
    })
  }

  const allColors = formatColorArray(colors)
  let userTheme, themeColors

  function determineUserTheme(userTheme) {
    if (userTheme !== 'auto') return userTheme
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark'
    return 'light'
  }

  function getThemeColors(theme) {
    const themeColors = {}
    Object.entries(themes[theme]).forEach(themeColor => {
      const [name, color] = themeColor

      themeColors[name] = {
        name: color,
        value: getCustomProperty(nameColorVariable(color))
      }
    })
    return formatColorArray(themeColors)
  }

  onMount(() => {
    userTheme = determineUserTheme($user.theme)
    themeColors = getThemeColors(userTheme)
  })

  const handleValuesChanges = (index, newValue) => {
    // change chart
    themeColors[index].value = newValue
    // change CSS
    const { color, value } = themeColors[index]
    setCustomProperty(nameColorVariable(color), value)
    // change localStorage
    $user.colors = themeColors
  }

  // keep the table in sync with a user changing themes
  $: if (browser) {
    userTheme = determineUserTheme($user.theme)
    themeColors = getThemeColors(userTheme)
  }

</script>

<style>
  .color-chart {
    width: var(--fullBleedWidth);
    padding: 0 var(--fullBleedPadding);
    overflow-x: auto;

    & :global(table) {
      width: 100%;

      & :global(th) {
        position: sticky;
        left: 0;
        z-index: 50;
      }
    }
  }
</style>

<section class='color-chart'>
  <noscript>
    <Chart 
      useStyles
      colors={allColors}
    />
  </noscript>

  <Chart 
    useStyles
    colors={themeColors}
    onValuesChange={handleValuesChanges}
    onInputBlur={() => 'this probably should not be required in the package'}
  />
</section>
