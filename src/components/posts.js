import React from 'react'
import { Link } from 'gatsby';
import PropTypes from 'prop-types';

const Posts = (props) => {
	return (
    <section style={{clear: 'both'}}>
      <h2>Blog Posts: </h2>
      <ul>
        {props.posts.map(({ node }, index) => (
          <li key={index}>
            <article> 
              <Link to={node.fields.slug}>
                <header>
                  <time dateTime={node.frontmatter.meta.date}>
                    {node.frontmatter.meta.humanDate}
                  </time> - {node.frontmatter.title}
                </header>
              </Link>
            </article>
          </li>
        ))} 
      </ul>
    </section>
  )
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default Posts;