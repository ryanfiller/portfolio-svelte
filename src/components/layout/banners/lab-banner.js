import React from 'react'
import PropTypes from 'prop-types'

import Meta from '../../content/meta'

const LabBanner = (props) => {
  const {
    contentType,
    title,
    meta,
    banner
  } = props

  return (
    <>
      <div className='banner__content'>
        <h1 className='banner__title'>
          {title}
        </h1>
        <Meta className='banner__tags' tags={meta.tags} />
      </div>
    </>
  )
}

LabBanner.propTypes = {
  contentType: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

export default LabBanner
