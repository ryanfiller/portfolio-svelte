import React from 'react'
import PropTypes from 'prop-types'

import {
  Default,
  Blog
} from './banners'

import './banner.scss'

const Banner = (props) => { 

  const { contentType } = props

  const renderBanner = contentType => {
    switch (contentType) {
      case 'blog':
        return <Blog {...props} />
      default: 
        return <Default {...props} />
    }
  }
  
  return (
    <section className={`banner banner--${contentType}`}>
      {renderBanner(contentType)}
    </section>
  )
}

Banner.propTypes = {
  contentType: PropTypes.string.isRequired
}

export default Banner
