import React from 'react'
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';

export const query = graphql`
	query HomePage {
		mdx(frontmatter: { title: { eq: "homepage" } } ) {
			frontmatter {
				options {
          hideSiteHeader
        }
			}
		}
	}
`

const HomePage = (props) => {
	return (
    <>
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
    </>
  )
}

HomePage.propTypes = {
    data: PropTypes.object.isRequired,
};

export default HomePage;