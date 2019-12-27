import React from 'react'
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';

import Markdown from '../components/layout/markdown';

export const query = graphql`
	query ChangeLogPage {
		mdx(frontmatter: { name: { eq: "changes" } } ) {
			frontmatter {
				title
			}
      tableOfContents
			body
		}
	}
`

const ChangeLogPage = (props) => {
	return (
    <>
      <Markdown post={props.data.mdx.body} />
    </>
  )
}

ChangeLogPage.propTypes = {
    data: PropTypes.object.isRequired,
};

export default ChangeLogPage;