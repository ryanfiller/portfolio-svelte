import React from 'react'
import PropTypes from 'prop-types'

import { slugify } from '../../../helpers'
import styles from './heading.module.scss'

const Heading = (props) => {

  const {
    h,
    children
  } = props
  
  const hashUrl = slugify(children)
  const Level = `h${h}`
  
  const copyHashLink = event => {
    event.preventDefault() // don't navigate to the link
    const pageLink = `${window.location}#${hashUrl}`
    navigator.clipboard.writeText(pageLink)
    console.log(`Copied ${pageLink} to clipboard.`)
  }

  return (
    <Level 
      id={hashUrl}
      className={styles.heading}
      onClick={copyHashLink}
      aria-label="Copy link to this header"
    >
      <span
        className={styles.heading__copy}
        title="Copy link to this header?"
      />
      {children}
    </Level>
  )
}

Heading.propTypes = {
  h: PropTypes.oneOf(['1', '2', '3', '4', '5', '6']).isRequired,
  children: PropTypes.string.isRequired
}

export default Heading
