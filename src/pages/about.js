import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'

import Markdown from '../components/layout/markdown'

export const query = graphql`
  query AboutPage {
    mdx(frontmatter: { name: { eq: "about" } } ) {
      frontmatter {
        name
        title
      }
      body
    }
  }
`

const AboutPage = (props) => {
  return (
    <main>
      <Markdown post={props.data.mdx.body} />
    </main>
  )
}

AboutPage.propTypes = {
  data: PropTypes.object.isRequired
}

export default AboutPage
