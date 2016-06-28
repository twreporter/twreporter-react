import { appId, getAbsPath } from '../../lib/url-transformer'
import { FacebookButton, TwitterButton } from 'react-social'
import { Link } from 'react-router'
import { navPath, colors } from '../../lib/constants'
import * as page from '../../constants/page-types'
import classNames from 'classnames'
import fbIcon from '../../../static/asset/fb.svg'
import logoIcon from '../../../static/asset/logo-mobile.svg'
import logoIconDark from '../../../static/asset/logo-mobile-dark.svg'
import React, { Component } from 'react'
import SearchBox from './SearchBox'
import styles from './MobileNavBar.scss'
import SubNavBar from './SubNavBar'
import twitterIcon from '../../../static/asset/twitter.svg'
import lineIcon from '../../../static/asset/line.svg'

export default class MobileNavBar extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      open: false
    }
  }

  _renderAritcleFirst(burgerMenu, logo, searchBox) {
    return (
      <div>
        <div className={styles.topBar}>
          {logo}
          {searchBox}
        </div>
        {burgerMenu}
      </div>
    )
  }

  _renderAritcleSecond(burgerMenu, searchBox, cUrl) {
    const navItemClass = styles.navButton
    const { pageTitle } = this.props
    const lineUrl = `http://line.naver.jp/R/msg/text/?${encodeURI(pageTitle + ' ' + cUrl)}`
    return (
      <div>
        <div className={styles.topBar}>
          <div className={classNames('center-block', 'text-right', styles.shareBtns)}>
            <FacebookButton className={navItemClass} url={cUrl} appId={appId}>
              <img src={fbIcon} />
            </FacebookButton>
            <TwitterButton className={navItemClass} message={pageTitle} url={cUrl}>
              <img src={twitterIcon} />
            </TwitterButton>
            <a href={lineUrl} className={navItemClass} url={cUrl}>
              <img src={lineIcon} />
            </a>
          </div>
          {searchBox}
        </div>
        {burgerMenu}
      </div>
    )
  }

  render() {
    const { path, header, isScrolledOver } = this.props
    const cUrl = getAbsPath(this.props.location.pathname, this.props.location.search)
    let backgroundColor = colors.whiteBg
    let linkColor = colors.darkBg
    let logo = logoIcon
    let navLogo
    let searchClass = ''
    let mobileNavClass = styles.mobileNav
    let burgerIconClass = styles.navIcon
    let mobileMenuClass = styles.mobileLinkContainer
    let navLinks = []

    if (this.props.bgStyle === 'dark') {
      backgroundColor = colors.darkBg
      linkColor = colors.whiteBg
      logo = logoIconDark
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
