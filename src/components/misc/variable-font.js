import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { slugify } from '../../helpers'
import './variable-font.scss'

const VariableFont = props => {

  const {
    url,
    name
  } = props

  const [text, setText] = useState('the five boxing wizards jump quickly')
  const handleTextChange = event => setText(event.target.value)

  let options = {}
  Object.entries(props.options).map(option => {
    const [name, [min, max]] = option
    const range = max - min;
    options[name] = {
      name: name,
      min: min,
      max: max,
      value: min >= 0 ? min : max,
      step: range === 1 ? .5 : 1,
    }
  })

  const [styles, setStyles] = useState({...options})

  const handleStyleOptionChange = event => {
    const { name, value } = event.target
    setStyles({ ...styles, [name]: {...styles[name], value: value} })
  }

  const [capitalization, setCapitalization] = useState('none')

  const fontStyles = Object.keys(props.options).map(option => {
    return `'${option}' ${styles[option].value}`
  }).join(', ')

  const inputStyle = { 
    fontFamily: name,
    fontVariationSettings: fontStyles,
    textTransform: capitalization
  }

  const makeId = string => `${slugify(props.name)}-${string}`

  return (
    <section className='variable-font'>
      <a
        className='variable-font__link'
        href={url}
      >
        {name}
      </a>

      <fieldset className='variable-font__options'>
        <legend>Options:</legend>
        {Object.values(styles).map((variable, index) => {
          const { name } = variable
          const id = makeId(`${name}-slider`)
          return(
            <div 
              key={index}
              className='variable-font__slider'
            >
              <label htmlFor={id}>
                {name}
              </label>
              <input
                type='range'
                id={id}
                {...variable}
                onChange={handleStyleOptionChange}
              />
            </div>
          )
        })}

        <div className='variable-font__select'>
          <label htmlFor={makeId('capitalization')}>text-transform</label>
          <select
            id={makeId('capitalization')}
            onChange={event => setCapitalization(event.target.value)}
          >
            <option value='none'>none</option>
            <option value='capitalize'>capitalize</option>
            <option value='uppercase'>uppercase</option>
            <option value='lowercase'>lowercase</option>
          </select> 
        </div>
        
      </fieldset>

      <div className='variable-font__example'>
        <label htmlFor={makeId('example-text')}>text example</label>
        <textarea
          id={makeId('example-text')}
          className='variable-font__example'
          style={inputStyle}
          wrap='hard'
          value={text}
          onChange={handleTextChange}
        />
      </div>

      <pre className='variable-font__code'>
        <code>
          font-family: "{name}";
          <br />
          font-variation-settings: {
            JSON.stringify(fontStyles)
            .replace(/"/g, '', )
            .replace(/'/g, '"', )
            .replace(/ "/g, '\n  "', )
            .replace(/"/, '\n  "', )
          };
          {capitalization !== 'none' &&
            <>
              <br />
              text-transform: "{capitalization}";
            </>
          }
        </code>
      </pre>
    </section>
  )
}

VariableFont.propTypes = {
  url: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.object.isRequired
}

export default VariableFont
