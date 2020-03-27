import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'

import './lab.scss'

import PostPreview from '../components/content/post-preview'

export const query = graphql`
  query LabPage {
    mdx(frontmatter: { name: { eq: "lab" } } ) {
      frontmatter {
        name
        title
      }
    }

    allMdx(
      sort: { order: DESC, fields: [frontmatter___meta___date]},
      filter: {
        fields: {contentType: { eq: "lab" }},
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

const LabPage = (props) => {

  const {
    edges: posts
  } = props.data.allMdx

  return (
    <main>
      <section>
        <ul className='list'>
          {posts.map((post, index) => (
            <li
              key={index}
              className={`lab--${post.node.frontmatter.meta.categories[0]}`}
              style={{ marginBottom: '2rem' }}
            >
              <PostPreview {...post} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}

LabPage.propTypes = {
  data: PropTypes.object.isRequired
}

export default LabPage
