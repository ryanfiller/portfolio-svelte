import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'

import { mainNav } from '../../config/pages'
import Nav from './nav'
import Banner from './banner'

import './header.scss'

const Header = (props) => {
  const {
    contentType,
    frontmatter
  } = props

  return (
    <header
      id='site-header'
      className='header'
    >
      <div className='header__content'>
        <Nav 
          label='main navigation'
          links={mainNav}
        >
          <Link
            to='/'
            className='logo'
          >
            ryanfiller.com
          </Link>
        </Nav>
      </div>
      {props.frontmatter.name !== 'homepage' &&
        <Banner 
          contentType={contentType}
          {...frontmatter}
        />
      }
    </header>
  )
}

Header.propTypes = {
  contentType: PropTypes.string.isRequired,
  frontmatter: PropTypes.object.isRequired
}

export default Header
