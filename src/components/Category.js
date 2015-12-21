import React from 'react'

if (process.env.BROWSER) {
  require('./Category.css')
}

export default (props) => {
  return (
    <span className="category" style={props.style}>{props.children}</span>
  )
}
