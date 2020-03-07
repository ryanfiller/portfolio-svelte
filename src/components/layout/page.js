import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import SEO from './seo'
import Header from './header'
import Footer from './footer'
import '../layout.css'

import '../../styles/globals.scss'
import './page.scss'

const Page = (props) => {

  const {
    fields: {
      contentType
    } = { contentType: 'page'},
    frontmatter,
    frontmatter: {
      name: pageName,
      options: { 
        hideSiteHeader = false
      } = {} // default to empty object if any values are missing
    }
  } = props.data.mdx

  return (
    <>
      <Helmet>
        <script 
          async
          src="//gc.zgo.at/count.js"
          data-goatcounter="https://ryanfiller.goatcounter.com/count"
        />
      </Helmet>
      <SEO {...props.data.mdx} />
      <div id='site' className={pageName}>
        {!hideSiteHeader && 
          <Header
            frontmatter={frontmatter}
            contentType={contentType}
          />
        }
        <div id='content'>
          {props.children}
        </div>
        <Footer />
      </div>
    </>
  )
}

Page.propTypes = {
  children: PropTypes.node.isRequired,
  data: PropTypes.object.isRequired
}

export default Page
