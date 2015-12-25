import React, { Component } from 'react'
import { Link } from 'react-router'
// import { slide as Menu } from 'react-burger-menu'

require('react-burger-menu').slide

if (process.env.BROWSER) {
  require('./NavBar.css')
}

export default class MobileNaviBar extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const catStyle = {}
    let logo = '/asset/logo.png'
    if (this.props.bgStyle === 'dark') {
      catStyle.color = '#FFFFFF'
      logo = 'asset/logo_dark.png'
    }
    return (
      <div className="nav-menu">
        <div className="nav-logo-category">
          <div className="nav-logo">
            <Link to="/"><img src={logo} height="50px" width="auto" /></Link>
          </div>
        </div>
      </div>
    )
  }
}
