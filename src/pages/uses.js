import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'

import Markdown from '../components/layout/markdown'

export const query = graphql`
  query UsesPage {
    mdx(frontmatter: { name: { eq: "uses" } } ) {
      frontmatter {
        name
        title
      }
      body
    }
  }
`

const UsesPage = (props) => {
  return (
    <main>
      <Markdown post={props.data.mdx.body} />
    </main>
  )
}

UsesPage.propTypes = {
  data: PropTypes.object.isRequired
}

export default UsesPage
