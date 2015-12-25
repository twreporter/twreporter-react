import React, { Component } from 'react'
import { Link } from 'react-router'

if (process.env.BROWSER) {
  require('./NavBar.css')
}

class Items extends Component {
  render() {
    const { children } = this.props
    let _children = []
    children.map((child, i) => {
      _children.push(
        <li className="menu-item" key={i}>
          {child}
        </li>
      )
    })
    return (
      <ul className="menu-items">
        {_children}
      </ul>
    )
  }
}

export default class DesktopNavBar extends Component {
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
          <div className="nav-category">
            <Items>
              <Link style={catStyle} to="/category/cat:台灣">台灣</Link>
              <Link style={catStyle} to="/category/review">觀點</Link>
              <Link style={catStyle} to="/photography">影像</Link>
              <Link style={catStyle} to="/category/cat:媒體">新媒體</Link>
            </Items>
          </div>
        </div>
      </div>
    )
  }
}
