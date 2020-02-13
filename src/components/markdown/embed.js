import React from 'react'
import PropTypes from 'prop-types'

import './embed.scss'

const Embed = (props) => {
  const {
    title,
    src,
    'data-aspect-ratio': ratio,
  } = props

  return (
    <div
      className={'embed'}
      data-aspect-ratio={ratio}
    >
      <iframe
        className={'embed__content'}
        title={title}
        src={src}
        loading='lazy'
      />
    </div>
  )
}

Embed.propTypes = {
  title: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  'data-aspect-ratio': PropTypes.oneOf([
    'full',
    '16/9',
    '4/3'
  ]),
}

export default Embed
