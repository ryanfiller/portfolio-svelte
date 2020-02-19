import React, { useState } from 'react'
import ColorChart from 'react-color-contrast-table'

// TODO proptypes

import './colors.scss'

// I really don't love this, but whatever I guess.
let noJs
if (typeof window === 'undefined') {
  noJs = true
}

const Colors = () => {

  const themeColors = [
    'primary',
    'dark',
    'light',
    'highlight',
    'active',
    'disabled'
  ]

  const getColor = colorName => {
    return getComputedStyle(document.documentElement)
    .getPropertyValue(`--${colorName}`).replace(' ', '')
  }

  const setColor = (colorName, colorValue) => {
    document.documentElement.style
    .setProperty(`--${colorName}`, colorValue)
  }

  const [colors, setColors] = useState( noJs ? 
    [
      { name: 'primary', value: '#192368' },
      { name: 'dark', value: '#1e053f' },
      { name: 'light', value: '#fff7ff' },
      { name: 'highlight', value: '#7c1863' },
      { name: 'active', value: '#ed6554' },
      { name: 'disabled', value: '#2f323a' }
    ] :
    themeColors.map(color => ({
      name: color,
      value: getColor(color)
    }))
  )

  const handleInputChange = index => event => {
    const newColors = [...colors]
    const name = event.target.name
    const value = event.target.value
    newColors[index] = {name: name, value: value}
    setColors(newColors)
    setColor(name, value)
  }
  
  return (
    <section className='color-table'>
      <div className='color-table__inputs'>
        {colors.map((color, index) => (
          <EditColor 
            key={index}
            index={index}
            {...color}
            onChange={handleInputChange}
          />
        ))}
      </div>
      <div className='color-table__table'>
        <ColorChart 
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
    <div className='color-table__input'>
      <label htmlFor={name} className='color-table__input-label'>
        <span className='color-table__input-label--name'>{name}</span>
        <span className='color-table__input-label--value'>{value}</span>
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

export default Colors