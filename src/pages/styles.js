import React from 'react'
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';

import Markdown from '../components/layout/markdown';

export const query = graphql`
	query StylesPage {
		mdx(frontmatter: { name: { eq: "styles" } } ) {
			frontmatter {
				title
			}
			body
		}
	}
`

const StylesPage = (props) => {
	return <Markdown post={props.data.mdx.body} />
}

StylesPage.propTypes = {
    data: PropTypes.object.isRequired,
};

export default StylesPage;