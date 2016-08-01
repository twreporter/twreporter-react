import { appId, getAbsPath } from '../../lib/url-transformer'
import { FacebookButton, TwitterButton } from 'react-social'
import { Link } from 'react-router'
import { navPath, colors } from '../../constants/index'
import { ARTICLE } from '../../constants/index'
import classNames from 'classnames'
import fbIcon from '../../../static/asset/fb.svg'
import logoIcon from '../../../static/asset/logo-navbar-s.svg'
import logoIconDark from '../../../static/asset/logo-white-s.svg'
import React, { Component } from 'react'
import SearchBox from './SearchBox'
import styles from './CategoryNavBar.scss'
import twitterIcon from '../../../static/asset/twitter.svg'
import lineIcon from '../../../static/asset/line.svg'

export default class CategoryNavBar extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      open: false
    }
  }

  _renderAritcleFirst(logo, searchBox) {
    return (
      <div>
        <div className={styles.topBar}>
          {logo}
          {searchBox}
        </div>
      </div>
    )
  }

  _renderAritcleSecond(searchBox) {
    return (
      <div>
        <div className={styles.topBar}>
          {searchBox}
        </div>
      </div>
    )
  }

  render() {
    const { path, header, isScrolledOver } = this.props
    const cUrl = getAbsPath(this.context.location.pathname, this.context.location.search)
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

    // if (this.state.open) {
      mobileNavClass = classNames(styles.mobileNav, styles.navOpen)
      burgerIconClass = classNames(styles.navIcon, styles.iconOpen)
      mobileMenuClass = classNames(styles.mobileLinkContainer, styles.containerOpen)
      if (this.props.bgStyle !== 'dark') {
        backgroundColor = colors.whiteBg
      }
    // } else {
    //   navLogo = <Link className={classNames(styles.navLogo, 'center-block', 'text-center')} to="/"><img src={logo} /></Link>
    //   searchClass = 'hidden'
    // }

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
    let menuBar = this._renderAritcleFirst(navLogo, searchBox)

    if (isScrolledOver && header.pageType === ARTICLE) {
      menuBar = this._renderAritcleSecond(searchBox)
    }

    return (
      <div className={mobileNavClass} style= {{ backgroundColor: backgroundColor }}>
        {menuBar}
        
        <div className={mobileMenuClass}>
          {navLinks}
        </div>
      </div>
    )
  }
}

CategoryNavBar.contextTypes = {
  location: React.PropTypes.object
}
