import React from 'react'
import cx from 'classnames'

import styles from './image.module.scss'

const Image = (props) => {
  const {
    src,
    alt,
    title,
    'data-align': align,
    'data-small': small,
    'data-caption': caption
  } = props

  // TODO? - https://css-tricks.com/reducing-motion-with-the-picture-element/
  // TODO - lazy load images

  const Img = (props) => {
    if (src.includes('.gif') || src.includes('.svg')) {
      return (
        <img
          className={props.className}
          alt={alt}
          title={title}
          src={src}
        />
      )
    } else {
      return (
        <img
          className={props.className}
          alt={alt}
          title={title}
          srcSet={`
            ${src}?nf_resize=fit&w=500 500w, 
            ${src}?nf_resize=fit&w=800 800w
          `}
          sizes='100vw' // TODO? - maybe make this more specifc
          src={`${src}?nf_resize=fit&w=1000`}
        />
      )
    }
  }

  const classNames = cx(
    styles['image'],
    styles[`image--${align}`],
    small && styles['image--small']
  )

  if (caption) {
    return (
      <figure className={classNames}>
        <Img />
        <figcaption>{caption}</figcaption>
      </figure>
    )
  } else {
    return <Img className={classNames} />
  }
}

export default Image
