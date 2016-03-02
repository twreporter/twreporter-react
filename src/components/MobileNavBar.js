import React, { Component } from 'react'
import { Link } from 'react-router'
import Sticky from 'react-sticky'
import classNames from 'classnames'
import SubNavBar from './SubNavBar'
import SearchBox from './SearchBox'
import { navPath } from '../lib/constants'

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
    let backgroundColor = '#FFF'
    let linkColor = 'black'
    let logo = '/asset/logo.png'
    let navLogo
    let searchClass = ''
    let mobileNavClass = styles.mobileNav
    let burgerIconClass = styles.navIcon
    let mobileMenuClass = styles.mobileLinkContainer
    let navLinks = []

    if (this.props.bgStyle === 'dark') {
      backgroundColor = '#3e3a39'
      linkColor = 'white'
      logo = 'asset/logo_dark.png'
    }

    if (this.state.open) {
      mobileNavClass = classNames(styles.mobileNav, styles.navOpen)
      burgerIconClass = classNames(styles.navIcon, styles.iconOpen)
      mobileMenuClass = classNames(styles.mobileLinkContainer, styles.containerOpen)
      if (this.props.bgStyle !== 'dark') {
        backgroundColor = '#F7F8F8'
      }
    } else {
      navLogo = <Link to="/"><img src={logo} /></Link>
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

    return (
      <Sticky topOffset={300}>
        <div className={mobileNavClass} style= {{ backgroundColor: backgroundColor }}>
          <div className="nav-logo">
            {navLogo}
            <SearchBox class={searchClass} style={{ width: '250px', marginTop: '-5px', display: 'inline-block' }} path={path} />
          </div>
          <div className={burgerIconClass} onClick={()=> { this.setState( { open: !this.state.open } )}}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className={mobileMenuClass}>
            {navLinks}
            <SubNavBar {...this.props}/>
          </div>
        </div>
      </Sticky>
    )
  }
}
