import React from 'react'

import { secondaryNav } from '../../config/pages'
import Nav from './nav'

import './footer.scss'

const Footer = () => (
  <footer
    id='site-footer'
    className='footer'
  >
    <div className='footer__content'>
      <span>
        Built with
        <a href='https://www.gatsbyjs.org/' target='_blank' rel='noopener noreferrer'>
          Gatsby
        </a>
          and hosted on
        <a href='https://www.netlify.com/' target='_blank' rel='noopener noreferrer'>
          Netlfy
        </a>
      </span>
      <Nav links={secondaryNav} label='utility navigation' />
    </div>
  </footer>
)

export default Footer
