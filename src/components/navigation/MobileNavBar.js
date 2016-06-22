import { appId, getAbsPath } from '../../lib/url-transformer'
import { FacebookButton, TwitterButton } from 'react-social'
import { Link } from 'react-router'
import { navPath, colors } from '../../lib/constants'
import * as page from '../../constants/page-types'
import classNames from 'classnames'
import React, { Component } from 'react'
import SearchBox from './SearchBox'
import styles from './MobileNavBar.scss'
import SubNavBar from './SubNavBar'

// require('react-burger-menu').slide

if (process.env.BROWSER) {
  require('../../containers/NavBar.css')
}

export default class MobileNavBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  _renderAritcleFirst(burgerMenu, logo, searchBox) {
    return (
      <div>
        <div className="nav-logo">
          {logo}
          {searchBox}
        </div>
        {burgerMenu}
      </div>
    )
  }

  _renderAritcleSecond(burgerMenu, searchBox, cUrl) {
    const navItemClass = styles.navButton
    return (
      <div>
        <div className="nav-logo">
          <div className={classNames('center-block', 'text-right')}>
            <FacebookButton className={navItemClass} url={cUrl} appId={appId}>
              <img src="/asset/fb.svg" />
            </FacebookButton>
          </div>
          {searchBox}
        </div>
        {burgerMenu}
      </div>
    )
  }

  render() {
    const { path, header, isScrolledOver } = this.props
    const cUrl = getAbsPath(this.context.location.pathname, this.context.location.search)
    let backgroundColor = colors.whiteBg
    let linkColor = colors.darkBg
    let logo = '/asset/logo-mobile.svg'
    let navLogo
    let searchClass = ''
    let mobileNavClass = styles.mobileNav
    let burgerIconClass = styles.navIcon
    let mobileMenuClass = styles.mobileLinkContainer
    let navLinks = []

    if (this.props.bgStyle === 'dark') {
      backgroundColor = colors.darkBg
      linkColor = colors.whiteBg
      logo = '/asset/logo-mobile-dark.svg'
    }

    if (this.state.open) {
      mobileNavClass = classNames(styles.mobileNav, styles.navOpen)
      burgerIconClass = classNames(styles.navIcon, styles.iconOpen)
      mobileMenuClass = classNames(styles.mobileLinkContainer, styles.containerOpen)
      if (this.props.bgStyle !== 'dark') {
        backgroundColor = colors.whiteBg
      }
    } else {
      navLogo = <Link className={classNames(styles.navLogo, 'center-block', 'text-center')} to="/"><img src={logo} /></Link>
      searchClass = 'hidden'
    }

    let navItems = [].concat(navPath)
    navItems.unshift( { title: '首頁', path: '/' } )
    for (let i in navItems) {
      let itemClassName
      if (navItems[i].path === path) {
        itemClassName = styles.active
      }
      navLinks.push(<Link key={i} style={{ color: linkColor }} className={classNames('menu-item', itemClassName)} to={navItems[i].path} onClick={()=> { this.setState( { open: !this.state.open } )}}><h1>{navItems[i].title}</h1></Link>)
    }

    let burgerMenu = <div className={burgerIconClass} onClick={()=> { this.setState( { open: !this.state.open } )}}>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
    let searchBox = <SearchBox class={searchClass} style={{ width: '250px', marginTop: '-5px', display: 'inline-block' }} path={path} />
    let menuBar = this._renderAritcleFirst(burgerMenu, navLogo, searchBox)

    if (isScrolledOver && header.pageType === page.ARTICLE) {
      menuBar = this._renderAritcleSecond(burgerMenu, searchBox, cUrl)
    }

    return (
      <div className={mobileNavClass} style= {{ backgroundColor: backgroundColor }}>
        {menuBar}
        <div className={mobileMenuClass}>
          {navLinks}
          <SubNavBar {...this.props}/>
        </div>
      </div>
    )
  }
}

MobileNavBar.contextTypes = {
  location: React.PropTypes.object
}
