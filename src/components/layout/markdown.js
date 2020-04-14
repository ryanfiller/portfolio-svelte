import React from 'react'
import PropTypes from 'prop-types'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'
import cx from 'classnames'

import { H1, H2, H3, H4, H5, H6 } from '../markdown/headings'
import Embed from '../markdown/embed'
import Image from '../markdown/image'
import Link from '../markdown/link'
import Table from '../markdown/table'

import './markdown.scss'

const components = {
  a: Link,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  iframe: Embed,
  img: Image,
  table: Table,
}

const Markdown = (props) => {
  return (
    <MDXProvider components={components}>
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
