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
    return (
      <div className="listing-menu">
        <ul className="menu-items">
          {this.props.children}
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
    const Nav = device === 'desktop' ? DesktopNav : MobileNav
    return (
      <div className="nav-menu">
        <div className="nav_logo">
          <a href="#"><img src="/asset/logo.png" height="58px" /></a>
          </div>
          <Nav>
            <li className="nav-item">
              <Link className="menu-item" to="/category/cat:台灣">台灣</Link>
            </li>
            <li className="nav-item">
              <Link className="menu-item" to="/category/cat:國際">國際</Link>
            </li>
            <li className="nav-item">
              <Link className="menu-item" to="/category/review">評論</Link>
            </li>
            <li className="nav-item">
              <Link className="menu-item" to="/category/cat:文化">文化</Link>
            </li>
            <li className="nav-item">
              <Link className="menu-item" to="/category/cat:影像">影像</Link>
            </li>
            <li className="nav-item">
              <Link className="menu-item" to="/category/hp-projects">專題</Link>
            </li>
            <li className="nav-item">
              <Link className="menu-item" to="/category/cat:媒體">媒體</Link>
            </li>
          </Nav>
      </div>
    )
  }
}

NaviBar.contextTypes = {
  device: PropTypes.string
}
