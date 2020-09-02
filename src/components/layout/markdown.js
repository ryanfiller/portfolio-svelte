import React from 'react'
import PropTypes from 'prop-types'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'
import cx from 'classnames'

import './markdown.scss'

const Markdown = (props) => {
  return (
    <MDXProvider>
      <article 
        className={cx(
          'markdown',
          props.className
        )}
      >
        <MDXRenderer>
          {props.post}
        </MDXRenderer>
      </article>
    </MDXProvider>
  )
}

Markdown.propTypes = {
  className: PropTypes.string,
  post: PropTypes.string.isRequired
}

export default Markdown
