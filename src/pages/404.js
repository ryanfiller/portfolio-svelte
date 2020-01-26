import React from 'react'
// import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

export const query = graphql`
  query NotFoundPage {
    mdx(frontmatter: { name: { eq: "404" } } ) {
      frontmatter {
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
  <>
    <h1>Ruh Roh.</h1>
  </>
)

NotFoundPage.propTypes = {
  // data: PropTypes.object.isRequired
}

export default NotFoundPage
