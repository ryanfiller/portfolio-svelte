import React from 'react'

import './framework-list.scss'

export default function FrameworkList(props) { 
  return React.cloneElement(props.children, {className: 'framework-list'})
}