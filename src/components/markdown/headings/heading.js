import React from 'react'
import PropTypes from 'prop-types'

import { slugify } from '../../../helpers'
import './heading.scss'

const Heading = (props) => {

  const {
    h,
    children
  } = props
  
  const hashUrl = slugify(children)
  const Level = `h${h}`

  return (
    <Level 
      id={hashUrl}
      className='heading'
    >
      <a href={`#${hashUrl}`}>
        {children}
      </a>
    </Level>
  )
}

Heading.propTypes = {
  h: PropTypes.oneOf(['1', '2', '3', '4', '5', '6']).isRequired,
  children: PropTypes.string.isRequired
}

export default Heading
