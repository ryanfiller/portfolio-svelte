import React, { useState } from 'react'
import { default as Chart } from 'react-color-contrast-table'
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

  const handleInputChange = index => event => {
    const newColors = [...colors]
    const { name, value } = event.target
    newColors[index] = {name: name, value: value}
    setColors(newColors)
    setColor(name, value)
  }
  
  return (
    <section className='color-chart'>
      {editable &&
        <div className='color-chart__inputs'>
          {colors.map((color, index) => (
            <EditColor 
              key={index}
              index={index}
              {...color}
              onChange={handleInputChange}
            />
          ))}
        </div>
      }
      <div 
        className={cx(
          'color-chart__table',
          editable && 'color-chart__table--editable'
        )}
      >
        <Chart 
          defaultStyles
          colors={colors}
        />
      </div>
    </section>
  )
}

const EditColor = props => {
  const {
    name,
    value,
    index,
    onChange
  } = props
  
  return(
    <div className='color-chart__input'>
      <label htmlFor={name} className='color-chart__input-label'>
        <span className='color-chart__input-label--name'>{name.replace('color', '').toLowerCase()}</span>
        <span className='color-chart__input-label--value'>{value}</span>
      </label>
      <input
        type='color'
        id={name}
        name={name}
        value={value}
        onChange={onChange(index)}
        disabled={noJs}
      />
    </div>
  )
}

ColorChart.propTypes = {
  editable: PropTypes.bool,
}

EditColor.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
}

export default ColorChart
