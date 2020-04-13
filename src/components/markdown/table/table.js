import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import './table.scss'

import plusMinus from './plus-minus'

const Table = props => {

  const { 
    className,
    children
  } = props

  const renderChildren = className => {
    switch (className) {
      case 'plus-minus':
        return plusMinus(children)
      default: 
        return children
    }
  }

  return (
    <table className={cx('table', className)}>
      {renderChildren(className)}
    </table>
  )

}

Table.propTypes = {
  children: PropTypes.node.isRequired
}

export default Table
