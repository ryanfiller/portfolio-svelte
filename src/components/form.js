import React, { useState } from 'react'
import PropTypes from 'prop-types'

import './form.scss'

const Form = (props) => {

  const {
    name,
    location,
    fields
  } = props

  const [renderState, setRenderState] = useState('form')
  const [formValues, setFormValues] = useState({})

  const encode = data => Object.keys(data).map(key => {
    return `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
  }).join('&')
  
  const handleFormSubmit = event => {
    event.preventDefault()
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': name,
        ...formValues,
        'location': location
      })
    })
    .then(() => setRenderState('sent'))
    .catch(error => {
      console.error(error)
      setRenderState('error')
    })
  }

  const renderForm = renderState => {
    switch (renderState) {
      case 'sent':
        return <div className='form__success'>
          <header>
            Sent!
          </header>
          <button 
            type='reset'
            onClick={() => {
              setFormValues({})
              setRenderState('form')
            }} 
          >
            Send Another?
          </button>
        </div>
      case 'error':
        return <div className='form__error'>
          <header>
            Error!
          </header>
          <button 
            type='reset'
            onClick={() => {
              setRenderState('form')
            }} 
          >
            Try again?
          </button>
        </div>
      default: // form
        return <form
          id={name}
          className='form'
          name={name}
          data-netlify='true'
          data-netlify-honeypot='bot-field'
          method='post'
          onSubmit={handleFormSubmit}
        >
          <input type='hidden' name='bot-field' />
          <input type='hidden' name='form-name' value={name} />
          {location && <input type='hidden' name='page' value={location} />}

          {fields.map( (field, index) => {
            const {
              name,
              type,
              placeholder,
              required
            } = field

            const Element = type === 'textarea' ? 'textarea' : 'input'

            return (
              <div key={index} className={`form__row form__row--${type}`}>
                <Element 
                  id={name}
                  name={name}
                  key={index}
                  type={type}
                  placeholder={placeholder ? placeholder : name}
                  required={!!required}
                  value={formValues[name] || ''}
                  onChange={event => setFormValues({...formValues, [name]: event.target.value })}
                />
                <label htmlFor={field.name}>
                  {name}
                </label>
              </div>
            )
          })}

          <button type='submit'>
            Submit
          </button>
        </form>
    }
  }

  return (
    <div className={`form__wrapper ${name} ${name}--${renderState}`} >
      {renderForm(renderState)}
    </div>
  )
}

Form.propTypes = {
  name: PropTypes.string.isRequired,
  location: PropTypes.string,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      required: PropTypes.bool,
      placeholder: PropTypes.string
    })
  ).isRequired
}

export default Form