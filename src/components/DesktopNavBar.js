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
              <Link style={catStyle} to="/category/cat:台灣"><h1>台灣</h1></Link>
              <Link style={catStyle} to="/category/review"><h1>觀點</h1></Link>
              <Link style={catStyle} to="/photography"><h1>影像</h1></Link>
              <Link style={catStyle} to="/category/cat:媒體"><h1>新媒體</h1></Link>
            </Items>
          </div>
        </div>
      </div>
    )
  }
}
