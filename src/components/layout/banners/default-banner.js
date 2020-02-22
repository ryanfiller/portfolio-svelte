import React from 'react'
import PropTypes from 'prop-types'

const DefaultBanner = (props) => {  
  return (
    <div 
      className='banner__content'
    >
      <h1 className='banner__title'>
        {props.title}
      </h1>
    </div>
  )
}

DefaultBanner.propTypes = {
  title: PropTypes.string.isRequired
}

export default DefaultBanner
