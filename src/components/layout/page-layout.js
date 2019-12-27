import React from 'react'
import PropTypes from 'prop-types'

import SEO from "../seo"
import Header from './header'

const PageLayout = (props) => {

  const {
    frontmatter: {
      title,
      options: {
        hideSiteHeader = false,
        color = 'pink'
      } = {}
    }
  } = props.data.mdx

  return (
    <>
      <SEO {...title} />
      <div id="site" >
        {!hideSiteHeader && <Header siteTitle={title} color={color} />}
        <main id="content">
          {props.children}
        </main>
      </div>
    </>
  )
}

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageLayout;