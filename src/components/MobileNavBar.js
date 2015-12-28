import React, { Component } from 'react'
import { Link } from 'react-router'
import Sticky from 'react-sticky'
import { slide as Menu } from 'react-burger-menu'

// require('react-burger-menu').slide

if (process.env.BROWSER) {
  require('./NavBar.css')
  require('./NavBurg.css')
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
      catStyle.backgroundColor = '#000'
      logo = 'asset/logo_dark.png'
    } else {
      catStyle.color = '#000'
      catStyle.backgroundColor = '#FFF'
    }
    return (
      <Sticky topOffset={80}>
        <div style= {{ backgroundColor: catStyle.backgroundColor }}>
          <div className="nav-logo">
            <Link to="/"><img src={logo} height="50px" width="auto" /></Link>
          </div>
          <Menu right>
            <Link to="/"><span>首頁</span></Link>
            <Link to="/category/cat:台灣"><span>台灣</span></Link>
            <Link to="/category/review"><span>觀點</span></Link>
            <Link to="/photography"><span>影像</span></Link>
            <Link to="/category/cat:媒體"><span>新媒體</span></Link>
          </Menu>
        </div>
      </Sticky>
    )
  }
}
