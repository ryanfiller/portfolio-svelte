import React from 'react'
import PropTypes from 'prop-types'

import styles from './embed.module.scss'

const Embed = (props) => {
  const {
    title,
    src,
    'data-aspect-ratio': ratio,
  } = props

  return (
    <div
    className={styles['embed']}
    style={{'--aspect-ratio': ratio}}
    >
      <iframe
        className={styles['embed__content']}
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
