import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'

import './nav.scss'

const Nav = props => {

  const Internal = props => (
    <Link 
      to={`/${props.url || props.name}`}
      className='nav__link'
      activeClassName='nav__link--active'
      partiallyActive={true} // return active when child routes are active
    >
      {props.name}
    </Link>
  )

  const External = props => (
    <a 
      href={props.url}
      className='nav__link'
      target='_blank' rel='noopener noreferrer'
    >
      {props.name}
    </a>
  )

  return (
    <nav className='nav' aria-label={props.label}>
      {props.children}
      <ul className='nav__list'>
        {props.links.map((link, index) => {
          return (
            <li
              key={index}
              className='nav__list-item'
            >
              {link.external ? <External {...link} /> : <Internal {...link} />} 
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

Nav.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      url: PropTypes.string,
      external: PropTypes.bool,
    })
  ).isRequired
}

export default Nav