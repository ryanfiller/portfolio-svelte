import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { CSSTransition } from 'react-transition-group'

import styles from './change.module.scss'

const Change = props => {
  const [open, toggleOpen] = useState(false)
  const handleToggleOpen = event => {
    event.preventDefault()
    toggleOpen(!open)
  }

  const elements = [...props.children]
  // remove first element, the h2
  const header = elements.shift()
  // remove the last element, the list
  const list = elements.pop()

  return (
    <section className={styles['change']} >
      {header}
      <div className={styles['change__summary-text']}>
        {elements}
      </div>
      <details 
        open={open}
        className={styles['change__details-text']}
      >
        <summary 
          onClick={handleToggleOpen}
          className={styles['change__details-label']}
        >
          Version Details
        </summary>
        <CSSTransition
          in={open}
          timeout={300}
          classNames={{
            enter: styles['list--enter'],
            enterDone: styles['list--enter-done'],
            exit: styles['list--exit'],
            exitDone: styles['list--exit-done']
           }}
        >
          {list}
        </CSSTransition> 
      </details>
    </section>
  )
}

Change.propTypes = {
  children: PropTypes.node.isRequired
}

export default Change