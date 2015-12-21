import React from 'react'

if (process.env.BROWSER) {
  require('./Category.css')
}

export default (props) => {
  return (
    <div className="category" style={props.style}>{props.children}</div>
  )
}
