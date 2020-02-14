import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'

import Markdown from '../components/layout/markdown'

export const query = graphql`
  query WorkshopPage {
    mdx(frontmatter: { name: { eq: "workshop" } } ) {
      frontmatter {
        name
        title
      }
      body
    }
  }
`

const WorkshopPage = (props) => {
  return (
    <main>
      <Markdown post={props.data.mdx.body} />
    </main>
  )
}

WorkshopPage.propTypes = {
  data: PropTypes.object.isRequired
}

export default WorkshopPage
