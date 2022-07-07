<script>
  import Chart from 'color-contrast-table-svelte'
  import { onMount } from 'svelte'
  import { colors, themes } from '$styles/config.js'
  import { capitalize, getCustomProperty, setCustomProperty } from '$helpers'

  const nameColor = color => `color${capitalize(color)}`

  const formatColors = colors => {
    return Object.entries(colors).map(color => {
      const [ name, value ] = color
      return { name: nameColor(name), value: value }  
    })
  }
  
  // set initial values for no js
  const formattedColors = formatColors(colors)
  let chartColors = formattedColors

  const getChartColors = colors => {
    return colors.map(color => ({
      name: color.name,
      value: getCustomProperty(color.name)
    }))
  }

  // sync with actual css variables
  onMount(() => {
    chartColors = getChartColors(formattedColors)
  })

  const handleValuesChanges = (index, newValue) => {
    const newColors = [...chartColors]
    newColors[index].value = newValue
    chartColors = newColors
    const { name, value } = newColors[index]
    setCustomProperty(name, value)
  }

  let showAllColors = false

  const cssForColors = (selector, theme) => {
    return formattedColors
      .filter(color => {
        return Object.values(theme)
          .map(color => nameColor(color))
          .includes(color.name)
      })
      .map(color => `${selector} [data-color="${color.name}"]`)
      .join(', ')
  }

</script>

<style>
  .color-chart {
    width: var(--fullBleedWidth);
    padding: 0 var(--fullBleedPadding);
    overflow-x: auto;

    & .options {
      cursor: pointer;
      margin-bottom: calc(0.5 * var(--padding));
      position: sticky;
      left: 0;
      text-align: right;

      & * > {
        display: inline-block;
      }
    }

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

<!-- bummer, this only works for js people -->
<svelte:head>
  {@html `
    <${'style'}>
      html[data-user-theme] [data-color^="color"] {
        display: none;
      }

      ${cssForColors('html[data-user-theme="light"]', themes.light)} {
        display: revert;
      }

      ${cssForColors('html[data-user-theme="dark"]', themes.dark)} {
        display: revert;
      }

      html[data-user-theme] .color-chart--show-all-colors [data-color^="color"] {
        display: revert !important;
      }
    </${'style'}>
  `}
</svelte:head>

<section class={showAllColors ? 'color-chart color-chart--show-all-colors' : 'color-chart'}>
  <div class='needs-js options'>
    <label for='show-all-colors'>
      show all colors
    </label>
    <input
      type='checkbox'
      id='show-all-colors'
      name='show-all-colors'
      bind:checked={showAllColors}
    />
  </div>

  <Chart 
    useStyles
    onValuesChange={handleValuesChanges}
    colors={chartColors}
  />
</section>