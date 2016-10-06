'use strict'

import * as Router from 'react-router'
import React from 'react'

const Link = (props={}) => {
  const { disableReactRouter, children, ...other } = props
  if (!disableReactRouter) {
    return (
      <Router.Link
        {...other}
      >
        {children}
      </Router.Link>
    )
  }
  const { className, target, to } = props
  return <a className={className} href={to} target={target || '_self'}>{children}</a>
}

export default Link
