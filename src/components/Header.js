import React, { Component } from 'react'

if (process.env.BROWSER) {
  require('./Header.css')
}

export default class Header extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="uh" />
    )
  }
}

Header.propTypes = { }
