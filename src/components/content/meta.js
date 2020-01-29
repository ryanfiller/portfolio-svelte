import React from 'react';
import PropTypes from 'prop-types'
import cx from 'classnames'
import { format } from 'date-fns'

import styles from './meta.module.scss'

const Meta = (props) => {

  const {
    className,
    date,
    dateFormat,
    tags,
    categories
  } = props;

  return (
    <div className={cx(
      className,
      styles.meta
    )}>
      {date && 
        <time
          className={styles['meta__date']} 
          dateTime={date}
        >
          {format(new Date(date), dateFormat || 'MMMM dd, yyyy')}
        </time>
      }
      {categories && 
        <ul className={styles['meta__categories']}>
          {categories.map((name, index) => {
            return <li key={index}>{name}</li>
          })}  
        </ul>
      }
      {tags && 
        <ul className={styles['meta__tags']}>
          {tags.map((name, index) => {
            return <li key={index}>{name}</li>
          })}
        </ul>
      }
    </div>
  )
}

Meta.propTypes = {
  className: PropTypes.string,
  date: PropTypes.string,
  dateFormat: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  categories: PropTypes.arrayOf(PropTypes.string)
}

export default Meta