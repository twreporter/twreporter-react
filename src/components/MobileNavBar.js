import React, { Component } from 'react'
import { Link } from 'react-router'
import Sticky from 'react-sticky'
import { categoryPath } from '../lib/constants'
// import { categoryPath } from '../lib/constants'

// require('react-burger-menu').slide

if (process.env.BROWSER) {
  require('./NavBar.css')
  require('./MobileNaviBar.css')
}

export default class MobileNaviBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  render() {
    const { taiwanPath, reviewPath, photographyPath, culturePath, intlPath } = categoryPath
    let backgroundColor = '#FFF'
    let linkColor = 'black'
    let logo = '/asset/logo.png'
    let burgerIconClass = 'nav-icon'
    let mobileMenuClass = 'mobile-link-container'
    if (this.props.bgStyle === 'dark') {
      backgroundColor = '#3e3a39'
      linkColor = 'white'
      logo = 'asset/logo_dark.png'
    }
    if (this.state.open) {
      burgerIconClass = 'nav-icon open'
      mobileMenuClass = 'mobile-link-container open'
    }

    return (
      <Sticky topOffset={300}>
        <div style= {{ backgroundColor: backgroundColor }}>
          <div className="nav-logo">
            <Link to="/"><img src={logo} /></Link>
          </div>
          <div className={burgerIconClass} onClick={()=> { this.setState( { open: !this.state.open } )}}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className={mobileMenuClass}>
            <Link style={{ color: linkColor }} to={taiwanPath}><h1>台灣</h1></Link>
            <Link style={{ color: linkColor }} to={intlPath}><h1>國際兩岸</h1></Link>
            <Link style={{ color: linkColor }} to={culturePath}><h1>文化</h1></Link>
            <Link style={{ color: linkColor }} to={photographyPath}><h1>影像</h1></Link>
            <Link style={{ color: linkColor }} to={reviewPath}><h1>專欄</h1></Link>
          </div>
        </div>
      </Sticky>
    )
  }
}
