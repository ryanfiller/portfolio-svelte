import React from 'react'
import { graphql } from 'gatsby'
// import PropTypes from 'prop-types'

export const query = graphql`
  query PortfolioPage {
    mdx(frontmatter: { name: { eq: "portfolio" } } ) {
      frontmatter {
        name
        title
      }
    }
  }
`

const PortfolioPage = (props) => {
  return (
    <main>
      <h1>portfolio</h1>
    </main>
  )
}

PortfolioPage.propTypes = {
  // data: PropTypes.object.isRequired
}

export default PortfolioPage
