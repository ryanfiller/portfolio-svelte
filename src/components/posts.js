import React from 'react'
import { Link } from 'gatsby';
import PropTypes from 'prop-types';

const Posts = (props) => {
	return (
    <section>
      <ul>
        {props.posts.map(({ node }, index) => (
          <li>
            <article key={index}> 
              <Link to={node.fields.slug}>
                <header>
                  <time datetime={node.frontmatter.meta.date}>
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