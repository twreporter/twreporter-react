import React from 'react'

if (process.env.BROWSER) {
  require('./Hexagon.css')
}

export default (props) => {
  return (
    <div className="hexagon-bg" style={props.style}>{props.children}</div>
  )
}
