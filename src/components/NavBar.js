import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { slide as Menu } from 'react-burger-menu'

require('react-burger-menu').slide

if (process.env.BROWSER) {
  require('./NavBar.css')
  require('./NavBurg.css')
}

class DesktopNav extends Component {
  render() {
    const { children } = this.props
    let _children = []
    children.map((child, i) => {
      _children.push(
        <li className="nav-item" key={i}>
          {child}
        </li>
      )
    })
    return (
      <div className="listing-menu">
        <ul className="menu-items">
          {_children}
        </ul>
      </div>
    )
  }
}

class MobileNav extends Component {
  render() {
    return (
      <div className="berg">
        <Menu right>
          {this.props.children}
        </Menu>
      </div>
    )
  }
}

export default class NaviBar extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { device } = this.context
    let Nav = device === 'desktop' ? DesktopNav : MobileNav
    const style = {
      zIndex: 1
    }
    const itemStyle = {}
    let logo = '/asset/logo.png'
    if (this.props.bgStyle === 'dark') {
      itemStyle.color = '#FFFFFF'
      logo = '/asset/logo_dark.png'
    }
    return (
      <div className="nav-menu" style={device === 'desktop' ? style : {}}>
        <div className="nav_logo">
          <Link to="/"><img src={logo} height="58px" /></Link>
        </div>
        <Nav>
          <Link className="menu-item" style={itemStyle} to="/category/cat:台灣"><h1>台灣</h1></Link>
          <Link className="menu-item" style={itemStyle} to="/category/review"><h1>觀點</h1></Link>
          <Link className="menu-item" style={itemStyle} to="/photography"><h1>影像</h1></Link>
          <Link className="menu-item" style={itemStyle} to="/category/cat:媒體"><h1>新媒體</h1></Link>
        </Nav>
      </div>
    )
  }
}

NaviBar.contextTypes = {
  device: PropTypes.string
}
