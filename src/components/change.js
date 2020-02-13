import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { CSSTransition } from 'react-transition-group'
import cx from 'classnames'

import './change.scss'

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
    <section 
      className={cx(
        'change',
      )}
    >
      {header}
      <div className='change__summary-text'>
        {elements}
      </div>
      <details 
        open={open}
        className='change__details-text'
      >
        <summary 
          onClick={handleToggleOpen}
          className='change__details-label'
        >
          Version Details
        </summary>
        <CSSTransition
          in={open}
          timeout={300}
          classNames={{
            enter: 'list--enter',
            enterDone: 'list--enter-done',
            exit: 'list--exit',
            exitDone: 'list--exit-done'
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