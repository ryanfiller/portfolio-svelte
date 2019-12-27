import React from "react"
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import SEO from "../components/seo"

export const query = graphql`
	query NotFoundPage {
		mdx(frontmatter: { title: { eq: "404" } } ) {
			frontmatter {
				title
        options {
          hideSiteHeader
        }
			}
			body
		}
	}
`

const NotFoundPage = () => (
  <>
    <SEO title="404: Not found" />
    <h1>Ruh Roh.</h1>
  </>
)

NotFoundPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default NotFoundPage