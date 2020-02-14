import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'

import { mainNav } from '../../config/pages'
import Nav from './nav'

import './header.scss'

const Header = (props) => (
  <header
    id='site-header'
    className='header'
  >
    <Link
      to='/'
      className='logo'
    >
      {props.title}
    </Link>
    <Nav links={mainNav} label='main navigation' />
  </header>
)

Header.propTypes = {
  title: PropTypes.string
}

export default Header
