import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'

import './workshop.scss'

import PostPreview from '../components/content/post-preview'

export const query = graphql`
  query WorkshopPage {
    mdx(frontmatter: { name: { eq: "workshop" } } ) {
      frontmatter {
        name
        title
      }
    }

    allMdx(
      sort: { order: DESC, fields: [frontmatter___meta___date]},
      filter: {
        fields: {contentType: { eq: "workshop" }},
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

const WorkshopPage = (props) => {

  const {
    edges: posts
  } = props.data.allMdx

  return (
    <main>
      <section>
        <ul className='list'>
          {posts.map((post, index) => (
            <li key={index} className={`workshop--${post.node.frontmatter.meta.categories[0]}`}>
              <PostPreview {...post} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}

WorkshopPage.propTypes = {
  data: PropTypes.object.isRequired
}

export default WorkshopPage
