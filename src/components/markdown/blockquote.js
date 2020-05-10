import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { Link } from 'gatsby'

import './blockquote.scss'

import TwitterIcon from '../../../static/images/site-assets/social/twitter.svg'

const Blockquote = props => {
  return (
    // className will come from twitter embed
    <blockquote className={cx(props.className, 'blockquote')}>
      {props.className?.includes('twitter-tweet') &&
        <Link 
          aria-label='tweet'
          className='blockquote__flag'
          to='/uses/#embedded-tweets'
        >
          <TwitterIcon />
        </Link>
      }
      {props.children}
    </blockquote>
  )

}

Blockquote.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
}

export default Blockquote