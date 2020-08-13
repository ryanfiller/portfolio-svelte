import React, { useState } from 'react'
import Chart from 'color-contrast-table-react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import './color-chart.scss'

// TODO can this get moved into context if its need other places?
let noJs
if (typeof window === 'undefined') {
  noJs = true
}

const themeColors = [
  'colorPrimary',
  'colorDark',
  'colorLight',
  // 'colorHighlight',
  // 'colorActive',
  'colorDisabled'
]

const getColor = colorName => {
  return getComputedStyle(document.documentElement)
  .getPropertyValue(`--${colorName}`).replace(' ', '')
}

const setColor = (colorName, colorValue) => {
  document.documentElement.style
  .setProperty(`--${colorName}`, colorValue)
}

const ColorChart = props => {
  const { editable } = props

  const [colors, setColors] = useState( noJs ? 
    // would be better to use a gatsby lifecycle hook to get webpack to import this in prebuild
    [
      // { name: 'primary', value: '#192368'},
      // { name: 'dark', value: '#1e053f'},
      // { name: 'light', value: '#fff7ff'},
      // // { name: 'highlight', value: '#7c1863'},
      // // { name: 'active', value: '#ed6554'},
      // { name: 'disabled', value: '#2f323a'},
      { name: 'primary', value: '#663390'},
      { name: 'dark', value: '#0f0f0f'},
      { name: 'light', value: '#fefefe'},
      // { name: 'highlight', value: '#663390'},
      // { name: 'active', value: '#663390'},
      { name: 'disabled', value: '#78757a'},
    ] :
    themeColors.map(color => ({
      name: color,
      value: getColor(color)
    }))
  )

  const handleValuesChanges = (index, newValue) => {
    const newColors = [...colors]
    newColors[index].value = newValue
    setColors(newColors)
    const { name, value } = newColors[index]
    setColor(name, value)
  }
  
  return (
    <section className='color-chart'>
        <Chart 
          useStyles
          editValues={editable}
          onValuesChange={handleValuesChanges}
          colors={colors}
        />
    </section>
  )
}

ColorChart.propTypes = {
  editable: PropTypes.bool,
}

export default ColorChart
