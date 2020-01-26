import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'

import Posts from '../components/posts'

export const query = graphql`
  query HomePage {

    site {
      siteMetadata {
        headshot
        author
        about
        description
      }
    }

    mdx(frontmatter: { name: { eq: "homepage" } } ) {
      frontmatter {
        options {
          hideSiteHeader
        }
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
              date
              humanDate: date(formatString: "MMM.DD.YY")
            }
          }
        }
      }
    }
  }
`

const HomePage = (props) => {
  return (
    <>
      <section
        style={{
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <div>
          <h1>{props.data.site.siteMetadata.description}</h1>
          <p style={{ margin: '1em 0' }}>
            {props.data.site.siteMetadata.about}
          </p>
        </div>
        <img
          style={{
            float: 'right',
            margin: '0 0 1em 1em',
            width: '200px'
          }}
          src={props.data.site.siteMetadata.headshot}
          alt={props.data.site.siteMetadata.author}
        />
      </section>

      <Posts posts={props.data.allMdx.edges} />
    </>
  )
}

HomePage.propTypes = {
  data: PropTypes.object.isRequired
}

export default HomePage
