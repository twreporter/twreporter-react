import React, { Component } from 'react'
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
    return (
      <div className="nav-menu">
        <div className="nav_logo">
          <a href="#"><img src="/asset/logo.png" height="58px" /></a>
        </div>
        <Nav>
          <Link className="menu-item" to="/category/cat:台灣">台灣</Link>
          <Link className="menu-item" to="/category/cat:國際">國際</Link>
          <Link className="menu-item" to="/category/review">評論</Link>
          <Link className="menu-item" to="/category/cat:文化">文化</Link>
          <Link className="menu-item" to="/category/cat:影像">影像</Link>
          <Link className="menu-item" to="/category/hp-projects">專題</Link>
          <Link className="menu-item" to="/category/cat:媒體">媒體</Link>
        </Nav>
      </div>
    )
  }
}

NaviBar.contextTypes = {
  device: React.PropTypes.string
}
