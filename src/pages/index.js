import React from 'react'
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';

import Posts from '../components/posts'

export const query = graphql`
	query HomePage {
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
      <h1>Under Construction</h1>

			<Posts posts={props.data.allMdx.edges} />
    </>
  )
}

HomePage.propTypes = {
    data: PropTypes.object.isRequired,
};

export default HomePage;