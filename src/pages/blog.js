import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'

import Posts from '../components/posts'

export const query = graphql`
  query BlogPage {
    mdx(frontmatter: { name: { eq: "blog" } } ) {
      frontmatter {
        title
      }
    }

    allMdx(
      sort: { order: DESC, fields: [frontmatter___meta___date]},
      filter: {
        fields: {contentType: { eq: "blog" }},
        frontmatter: { options: { published: { eq: true } } }
      },
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            meta {
              excerpt
              date
              categories
              tags
            }
          }
        }
      }
    }
  }
`

const BlogPage = (props) => {
  return (
    <>
      <h1>blog</h1>
      <Posts posts={props.data.allMdx.edges} />
    </>
  )
}

BlogPage.propTypes = {
  data: PropTypes.object.isRequired
}

export default BlogPage
