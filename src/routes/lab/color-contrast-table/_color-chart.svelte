<script>
  import Chart from 'color-contrast-table-svelte'

  import { onMount } from 'svelte'

  // TODO - is there a way to automatically get this from css?
  let colors = [
    // { name: 'colorPrimary', value: '#192368'},
    // { name: 'colorDark', value: '#1e053f'},
    // { name: 'colorLight', value: '#fff7ff'},
    // // { name: 'colorHighlight', value: '#7c1863'},
    // // { name: 'colorActive', value: '#ed6554'},
    // { name: 'colorDisabled', value: '#2f323a'},
    { name: 'colorPrimary', value: '#663390'},
    { name: 'colorDark', value: '#0f0f0f'},
    { name: 'colorLight', value: '#fefefe'},
    // { name: 'colorHighlight', value: '#663390'},
    // { name: 'colorActive', value: '#663390'},
    { name: 'colorDisabled', value: '#78757a'},
  ]

  const themeColors = [
    'colorPrimary',
    'colorDark',
    'colorLight',
    // 'colorHighlight',
    // 'colorActive',
    'colorDisabled'
  ]

  let handleValuesChanges

  onMount(() => {
    const getColor = colorName => {
      return getComputedStyle(document.documentElement).getPropertyValue(`--${colorName}`).replace(' ', '')
    }
  
    const setColor = (colorName, colorValue) => {
      document.documentElement.style.setProperty(`--${colorName}`, colorValue)
    }

    colors = themeColors.map(color => ({
      name: color,
      value: getColor(color)
    }))

    handleValuesChanges = (index, newValue) => {
      const newColors = [...colors]
      newColors[index].value = newValue
      colors = newColors
      const { name, value } = newColors[index]
      setColor(name, value)
    }
  })

</script>

<style global type='text/scss'>
  .color-chart {
    width: 100%;

    & > table {
      width: 100%;
    }
  }
</style>

<section class='color-chart'>
  <Chart 
    useStyles
    onValuesChange={handleValuesChanges}
    colors={colors}
  />
</section>