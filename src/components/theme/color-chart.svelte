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
  let userColors, themeColors

  function determinUserColors(user) {
    const getTheme = (theme) => {
      if (theme !== 'auto') return theme
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark'
      return 'light'
    }

    const getContrast = (contrast) => {
      if (contrast) return contrast
      if (window.matchMedia('(prefers-contrast: more)').matches) return 'more'
      return 'no-preference'
    }

    return {
      theme: getTheme(user.theme),
      contrast: getContrast(user.contrast)
    }
  }

  function getThemeColors(theme) {
    const themeColors = {}
    Object.entries(themes[theme.theme]).forEach(themeColor => {
      const [name, color] = themeColor

      themeColors[name] = {
        name: color,
        value: getCustomProperty(nameColorVariable(color))
      }
    })

    if (theme.contrast === 'more') {
      Object.entries(themes[theme.theme]).forEach(themeColor => {
        console.log('themeColor', themeColor)
        const [name] = themeColor

        if (!(name === 'background' || name === 'primary')) {
          delete themeColors[name]
        }
      })
    }

    return formatColorArray(themeColors)
  }

  onMount(() => {
    userColors = determinUserColors($user)
    themeColors = getThemeColors(userColors)
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
    userColors = determinUserColors($user)
    themeColors = getThemeColors(userColors)
  }

</script>

<style>
  .color-chart {
    overflow-x: auto;
    margin: 0 var(--fullBleedPadding);
    /* width: var(--fullBleedWidth); */
    width: calc(100% - (2 * var(--fullBleedPadding)));

    & :global {
      & table {
        width: 100%;
        overflow-x: auto;

        & th {
          position: sticky;
          left: 0;
          z-index: 50;
        }
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
