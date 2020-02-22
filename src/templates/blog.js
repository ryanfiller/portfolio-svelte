import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Markdown from '../components/layout/markdown'


export const query = graphql`
  query BlogPost($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      fields {
        contentType
      }
      frontmatter {
        title
        banner {
          url
          alt
        }
        meta {
          date(formatString: "MMMM DD, YYYY")
          excerpt
          categories
          tags
        }
      }
      excerpt
      body
    }
  }
`

const BlogPost = (props) => {
  const {
    frontmatter,
    body
  } = props.data.mdx

  return (
    <main className='blog-post'>
      <Markdown post={body} />
    </main>
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    mdx: PropTypes.shape({
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        meta: PropTypes.shape({
          date: PropTypes.string.isRequired
        }).isRequired
      }).isRequired,
      body: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
}

export default BlogPost
