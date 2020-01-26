import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

const SEO = (props) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            author
            about
          }
        }
      }
    `
  )

  // these destructures are kind of a disaster...

  const { 
    siteMetadata: {
      // rename title to siteTitle
      title: siteTitle,
      // rename about to siteExcerpt
      about: siteExcerpt,
      author
    }
   } = site

  const { 
    frontmatter: {
      // rename title to pageTitle
      title: pageTitle,
      meta: {
        // rename excerpt to pageExcerpt
        excerpt: pageExcerpt,
        categories,
        tags,
      } = {} // default to empty object for pages without meta data
    } = { title: 'Page Not Found' }, // set a default for the 404 page
    // rename excerpt to generatedExcerpt
    excerpt: generatedExcerpt
  } = props

  const getKeywords = () => {
    const keywords = []

    if (categories) {
      categories.map(category => keywords.push(category))
    }

    if (tags) {
      tags.map(tag => keywords.push(tag))
    }

    return keywords.join(', ')
  }

  return (
    <Helmet
      htmlAttributes={{
        lang: 'en'
      }}
      title={pageTitle ? `${siteTitle} | ${pageTitle}` : siteTitle}

      meta={[
        {
          name: 'author',
          content: author
        },
        {
          name: 'description',
          content: pageExcerpt || generatedExcerpt || siteExcerpt
        },
        {
          name: 'keywords',
          content: getKeywords()
        },

        // TODO - social SEO work

        // facebook
        // {
        //   property: 'og:title',
        //   content: frontmatter.title
        // },
        // {
        //   property: 'og:description',
        //   content: metaDescription
        // },
        // {
        //   property: 'og:type',
        //   content: 'website'
        // },
        // twitter 
        // {
        //   name: 'twitter:card',
        //   content: 'summary'
        // },
        // {
        //   name: 'twitter:creator',
        //   content: siteMetadata.author
        // },
        // {
        //   name: 'twitter:title',
        //   content: frontmatter.title
        // },
        // {
        //   name: 'twitter:description',
        //   content: metaDescription
        // }
      ]}
    />
  )
}

SEO.propTypes = {
  frontmatter: PropTypes.shape({
    title: PropTypes.string,
    meta: PropTypes.shape({
      excerpt: PropTypes.string,
      categories: PropTypes.array,
      tags: PropTypes.array,
    })
  }),
  excerpt: PropTypes.string
}

export default SEO
