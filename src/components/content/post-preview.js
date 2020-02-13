import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'gatsby'

import './post-preview.scss'
import Meta from './meta'

const PostPreview = props => {
  const { slug } = props.node.fields
  const { 
    title, 
    meta: {
      date,
      excerpt,
      categories,
      tags
    } 
  } = props.node.frontmatter

  return (
    <article className='post'>
      <header className='post__header'>
        <Link to={slug}>
          {title}
        </Link>
      </header>
      <Meta
        className='post__date'
        date={date}
      />
      <p className='post__excerpt'>
        {excerpt}
      </p>
      <Meta 
        className='post__tags'
        categories={categories}
        tags={tags}
      />
      <Link 
        to={slug}
        className='post__link'>
          Read
      </Link>
    </article>
  )
}

PostPreview.propTypes = {
  fields: PropTypes.shape({
    slug: PropTypes.string.isRequired,
  }),
  frontmatter: PropTypes.shape({
    title: PropTypes.string.isRequired,
    meta: PropTypes.shape({
      date: PropTypes.string,
      excerpt: PropTypes.string,
      categories: PropTypes.arrayOf(PropTypes.string),
      tags: PropTypes.arrayOf(PropTypes.string)
    })
  })
}

export default PostPreview