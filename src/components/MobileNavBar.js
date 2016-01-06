import React, { Component } from 'react'
import { Link } from 'react-router'
import Sticky from 'react-sticky'
import { slide as Menu } from 'react-burger-menu'
import { categoryPath } from '../lib/constants'

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
    const { taiwanPath, reviewPath, photographyPath, intlPath } = categoryPath
    const { device } = this.context
    let backgroundColor = '#FFF'
    let logo = '/asset/logo.png'
    if (this.props.bgStyle === 'dark') {
      backgroundColor = '#3e3a39'
      logo = 'asset/logo_dark.png'
    }

    return (
      <Sticky topOffset={300}>
        <div style= {{ backgroundColor: backgroundColor }}>
          <div className="nav-logo">
            <Link to="/"><img src={logo} /></Link>
          </div>
          { device === 'desktop' ?
          <Menu right>
            <Link to="/"><span>首頁</span></Link>
            <Link to={taiwanPath}><span>台灣</span></Link>
            <Link to={intlPath}><span>國際兩岸</span></Link>
            <Link to={reviewPath}><span>觀點</span></Link>
            <Link to={photographyPath}><span>影像</span></Link>
          </Menu>
          : null }
        </div>
      </Sticky>
    )
  }
}

MobileNaviBar.contextTypes = {
  device: React.PropTypes.string
}
