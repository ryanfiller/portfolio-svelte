import React from 'react'
import { graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';

export const query = graphql`
	query BlogPage {
		mdx(frontmatter: { title: { eq: "blog" } } ) {
			frontmatter {
        title
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
							date(formatString: "MMM.DD.YY")
						}
					}
				}
			}
		}
	}
`

const BlogPage = (props) => {
	return (
    <>
      <h1>blog</h1>

			{props.data.allMdx.edges.map(({ node }, index) => (
				<div key={index}> 
					<Link to={node.fields.slug}>
						{node.frontmatter.title}
						{node.frontmatter.meta.date}
					</Link>
				</div>
			))} 
    </>
  )
}

BlogPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default BlogPage;