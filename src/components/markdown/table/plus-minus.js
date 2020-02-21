import React from 'react'

// TODO - this is fragile, it should really use a better method"
// https://mdxjs.com/guides/writing-a-plugin#visiting-heading-nodes
const plusMinus = children =>  {

  const fixTBody = tbody => {
    return React.cloneElement(tbody, {
      children: tbody.props.children.map(tr => {
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
  }
  
  if (Array.isArray(children)) {
    return children.map(child => {
      const type = child.props.originalType
      if (type === 'tbody') {
        return fixTBody(child)
      } else {
        // caption, thead
        return child 
      }
    })
  } else {
    return fixTBody(children)
  }
}

export default plusMinus