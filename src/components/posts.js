import React from 'react'
import PropTypes from 'prop-types'

import PostPreview from './content/post-preview'

const Posts = (props) => {
  return (
    <section style={{ clear: 'both' }}>
      <h2>Blog Posts: </h2>
      <ul style={{ listStyle: 'none', padding: '0', margin: '0 0 2rem 0' }}>
        {props.posts.map((post, index) => (
          <li key={index}>
            <PostPreview {...post} />
          </li>
        ))}
      </ul>
    </section>
  )
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired
}

export default Posts
