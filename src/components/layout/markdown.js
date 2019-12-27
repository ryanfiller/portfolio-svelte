import React from 'react'
import PropTypes from 'prop-types'
import { MDXRenderer } from "gatsby-plugin-mdx"
import { MDXProvider } from '@mdx-js/react'

const components = {

}

const Markdown = (props) => {

	return (
		<MDXProvider components={components}>
			<article className={props.className}>
				<MDXRenderer>
					{props.post}
				</MDXRenderer>
			</article>
		</MDXProvider>
	)
}

Markdown.propTypes = {
  className: PropTypes.string,
  post: PropTypes.string.isRequired,
};

export default Markdown;