import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'

import Markdown from '../components/layout/markdown'

export const query = graphql`
  query StylesPage {
    mdx(frontmatter: { name: { eq: "styles" } } ) {
      frontmatter {
        name
        title
      }
      body
    }
  }
`

const StylesPage = (props) => {
  return (
    <main>
      <Markdown post={props.data.mdx.body} />
    </main>
  )
}

StylesPage.propTypes = {
  data: PropTypes.object.isRequired
}

export default StylesPage
