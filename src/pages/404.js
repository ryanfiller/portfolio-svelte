import React from 'react'
// import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

export const query = graphql`
  query NotFoundPage {
    mdx(frontmatter: { name: { eq: "404" } } ) {
      frontmatter {
        name
        title
        options {
          hideSiteHeader
        }
      }
      excerpt
      body
    }
  }
`

const NotFoundPage = () => (
  <main>
    <h1>Ruh Roh.</h1>
  </main>
)

NotFoundPage.propTypes = {
  // data: PropTypes.object.isRequired
}

export default NotFoundPage
