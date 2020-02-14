import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'

import Markdown from '../components/layout/markdown'

export const query = graphql`
  query ChangeLogPage {
    mdx(frontmatter: { name: { eq: "changes" } } ) {
      frontmatter {
        name
        title
      }
      tableOfContents
      body
    }
  }
`

const ChangeLogPage = (props) => {
  return (
    <main>
      <Markdown post={props.data.mdx.body} />
    </main>
  )
}

ChangeLogPage.propTypes = {
  data: PropTypes.object.isRequired
}

export default ChangeLogPage
