import React from 'react'
import tables from './data.js'

import './table.scss'

const scoreTitles = [
  'First Meaningful Paint',
  'Time to Interaction',
  'Max Potential First Input Delay'
]

const getDiff = (score, compare) => {
  const diff = ((score - compare) / compare) * 100
  if (diff > 0) {
    return <span className='diff diff--increase'>(+{diff.toFixed(2)}%)</span>
  } else if (diff < 0) {
    return <span className='diff diff--decrease'>({diff.toFixed(2)}%)</span>
  }
}

const Table = props => {
  const {
    caption,
    data
  } = tables[props.data]

  return (
    <table className='diff-table'>
      {!!caption && <caption>{caption}</caption>}
      <tbody>
        <tr>
          <th></th>
          {Object.keys(data).map((title, index) => (
            <th key={index}>
              {title}
            </th>
          ))}
        </tr>

        {scoreTitles.map((title, rowIndex) => (
          <tr key={rowIndex}>
            <td>{title}</td>
            
            {Object.values(data).map((data, columnIndex) => {
              const score = data.scores[rowIndex]
              const diff = !!data.diff ? getDiff(score, data.diff.scores[rowIndex]) : ''
              return(
                <td key={columnIndex} align='right'>
                  {diff}
                  <span>{score.toFixed(2)}s</span>
                </td>
              )
            })}
          </tr>
        ))}
      </tbody>
    </table> 
  )
}

export default Table
