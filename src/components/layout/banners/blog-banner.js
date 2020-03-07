import React from 'react'
import PropTypes from 'prop-types'

import Meta from '../../../components/content/meta'

const BlogBanner = (props) => {
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
        <Meta className='banner__date' date={meta.date} />
        <Meta className='banner__tags' categories={meta.categories} tags={meta.tags} />
      </div>
      {/* TODO */}
      {/* {banner && 
        <picture 
          className='banner__image'
        >
          <img
            src={`https://ryanfiller.com${banner.url}?nf_resize=fit&w=100`}
            alt={banner.alt}
          />
        </picture>
      } */}
    </>
  )
}

BlogBanner.propTypes = {
  contentType: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

export default BlogBanner
