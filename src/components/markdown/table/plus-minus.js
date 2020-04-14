import React from 'react'

const plusMinus = children =>  {
  return children.map(child => {
    const type = child.props.originalType
    if (type === 'tbody') {
      return React.cloneElement(child, {
        children: child.props.children.map(tr => {
          return React.cloneElement(tr, {
            children: tr.props.children.map(child => {
              const type = child.props.originalType
              if (type === 'td') {
                const text = child.props.children
                // if text includes '(string)'
                if (text.match(/\(([^)]+)\)/)) {
                  const data = text.split(' (')[0]
                  const change = text.match(/\(([^)]+)\)/)[0]
                  let sign
                  if (change.includes('+')) { sign = 'plus'}
                  if (change.includes('-')) { sign = 'minus'}

                  return React.cloneElement(child, {
                    children: [
                      <div>
                        {data}
                        <span className={sign}>{change}</span>
                      </div>
                    ]
                  })
                } else {
                  return child
                }
              } else {
                // th
                return child
              }
            })
          })
        })
      })
    } else {
      // caption, thead
      return child 
    }
  })
}

export default plusMinus