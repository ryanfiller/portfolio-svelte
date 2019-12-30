import React from 'react'
import PropTypes from 'prop-types'

import SEO from "../seo"
import Header from './header'
import "../layout.css"

const PageLayout = (props) => {

  const {
    frontmatter: {
      title,
      options: {
        hideSiteHeader = false,
      } = {}
    }
  } = props.data.mdx

  return (
    <>
      <SEO {...title} />
      <div id="site" >
        {!hideSiteHeader && <Header title={'ryanfiller.com'} />}
        <main id="content"
          style={{
            margin: `0 auto`,
            maxWidth: 960,
            padding: `0px 1.0875rem 1.45rem`,
            paddingTop: 0,
          }}
        >
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