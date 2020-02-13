import React from 'react'
import PropTypes from 'prop-types'
import { Link as GatsbyLink } from 'gatsby'

import './link.scss'

const Link = (props) => {
  const {
    href,
    children: content
  } = props

  let internalUrl

  if (href[0] === '/') {
    // if it starts with / its a relative link
    internalUrl = href
  } else if (href.includes('ryanfiller.com')) {
    // break on domain name, get everything after
    internalUrl = href.split("ryanfiller.com").slice(-1)[0] 
  }

  if (internalUrl) {
    return (
      <GatsbyLink
        to={internalUrl}
        title={`ryanfiller.com${internalUrl}`}
        className='link'
      >
        {content} 
      </GatsbyLink>
    )
  } else {
    return (
      <a 
        href={href}
        title={href}
        className='link'
        target="_blank" rel="noopener noreferrer"
      >
        {content}
      </a>
    )
  }
}

Link.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

export default Link
