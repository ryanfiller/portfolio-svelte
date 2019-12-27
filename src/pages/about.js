import React from 'react'
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';

import Markdown from '../components/layout/markdown';

export const query = graphql`
	query AboutPage {
		mdx(frontmatter: { name: { eq: "about" } } ) {
			frontmatter {
				title
			}
			body
		}
	}
`

const AboutPage = (props) => {
	return <Markdown post={props.data.mdx.body} />
}

AboutPage.propTypes = {
    data: PropTypes.object.isRequired,
};

export default AboutPage;