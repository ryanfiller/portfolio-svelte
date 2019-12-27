import React from 'react'
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';

import Markdown from '../components/layout/markdown';

export const query = graphql`
	query WorkshopPage {
		mdx(frontmatter: { title: { eq: "workshop" } } ) {
			frontmatter {
				title
			}
			body
		}
	}
`

const WorkshopPage = (props) => {
	return <Markdown post={props.data.mdx.body} />
}

WorkshopPage.propTypes = {
    data: PropTypes.object.isRequired,
};

export default WorkshopPage;