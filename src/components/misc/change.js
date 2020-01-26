import React, { useState } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import styles from './change.module.scss'

const Change = props => {

  const [open, toggleOpen] = useState(false)
  const handleToggleOpen = () => toggleOpen(!open)

  return (
    <section className={cx(
      styles.change,
      open && styles['change--open']
    )}>
      {props.children}
      <button 
        className={styles['change__button']}
        onClick={handleToggleOpen}
        role="switch"
        aria-checked={open}
      >
        Read {!open ? 'More' : 'Less'}...
      </button>
    </section>
  )
}

Change.propTypes = {
  children: PropTypes.node.isRequired
}

export default Change