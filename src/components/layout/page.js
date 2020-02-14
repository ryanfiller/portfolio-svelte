import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import SEO from './seo'
import Header from './header'
import Footer from './footer'
import '../layout.css'

import '../../styles/globals.scss'
import './page.scss'

const PageLayout = (props) => {

  const { 
    name: pageName,
    options: { 
      hideSiteHeader = false
    } = {} // default to empty object if any values are missing
  } = props.data.mdx.frontmatter

  return (
    <>
      <Helmet>
        <script data-goatcounter="https://ryanfiller.goatcounter.com/count" async src="//gc.zgo.at/count.js"/>
      </Helmet>
      <SEO {...props.data.mdx} />
      <div id='site' className={pageName}>
        {!hideSiteHeader && 
          <Header title='ryanfiller.com' />
        }
        <div id='content'>
          {props.children}
        </div>
        <Footer />
      </div>
    </>
  )
}

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
  data: PropTypes.shape({
    mdx: PropTypes.shape({
      frontmatter: PropTypes.shape({
        name: PropTypes.string.isRequired,
        title: PropTypes.string,
        options: PropTypes.shape({
          hideSiteHeader: PropTypes.bool
        })
      }).isRequired
    }).isRequired
  }).isRequired
}

export default PageLayout
