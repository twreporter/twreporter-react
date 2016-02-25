import React, { Component } from 'react'
import { Link } from 'react-router'
import Sticky from 'react-sticky'
import classNames from 'classnames'
import SubNavBar from './SubNavBar'
import SearchBox from './SearchBox'
import { categoryPath } from '../lib/constants'

// require('react-burger-menu').slide

if (process.env.BROWSER) {
  require('./NavBar.css')
}
const styles = require('./MobileNaviBar.scss')

export default class MobileNaviBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  render() {
    const { path } = this.props
    const { taiwanPath, reviewPath, photographyPath, culturePath, intlPath } = categoryPath
    let backgroundColor = '#FFF'
    let linkColor = 'black'
    let logo = '/asset/logo.png'
    let navLogo
    let searchClass = ''
    let mobileNavClass = styles.mobileNav
    let burgerIconClass = styles.navIcon
    let mobileMenuClass = styles.mobileLinkContainer
    if (this.state.open) {
      mobileNavClass = classNames(styles.mobileNav, styles.navOpen)
      burgerIconClass = classNames(styles.navIcon, styles.iconOpen)
      mobileMenuClass = classNames(styles.mobileLinkContainer, styles.containerOpen)
      backgroundColor = '#F7F8F8'
    } else {
      navLogo = <Link to="/"><img src={logo} /></Link>
      searchClass = 'hidden'
    }

    if (this.props.bgStyle === 'dark') {
      backgroundColor = '#3e3a39'
      linkColor = 'white'
      logo = 'asset/logo_dark.png'
    }

    return (
      <Sticky topOffset={300}>
        <div className={mobileNavClass} style= {{ backgroundColor: backgroundColor }}>
          <div className="nav-logo">
            {navLogo}
            <SearchBox class={searchClass} style={{ width: '250px', marginTop: '-5px', display: path !== '/photography' ? 'inline-block' : 'none' }} path={path} />
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
            <SubNavBar {...this.props}/>
          </div>
        </div>
      </Sticky>
    )
  }
}
