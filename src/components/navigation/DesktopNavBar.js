import * as page from '../../constants/page-types'
import React, { Component } from 'react'
import { Link } from 'react-router'
import classNames from 'classnames'
import styles from './DesktopNavBar.scss'
import { FacebookButton, TwitterButton } from 'react-social'
import { getAbsPath } from '../../lib/url-transformer'
import { appId } from '../../lib/constants'

if (process.env.BROWSER) {
  require('../../containers/NavBar.css')
}

export default class DesktopNavBar extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      open: false
    }
  }

  _renderAritcleFirst(burgerIconClass, logo) {
    return (
      <div className={styles.navContainer}>
        <div className={styles.navLeft}>
          <div className={burgerIconClass} onClick={()=> { this.setState( { open: !this.state.open } )}}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className={styles.navCenter}>
          <Link className={styles.navLogo} to="/"><img src={logo} /></Link>
        </div>
        <div className={styles.navRight}>
          <a target="_blank" className={styles.donateButton} href="https://twreporter.backme.tw/cashflow/checkout?project_id=175&reward_id=718">
            <img className={styles.donateIcon} src="/asset/donate.svg"/>贊助我們
          </a>
        </div>
      </div>
    )
  }

  _renderAritcleSecond(burgerIconClass, cUrl) {
    const navItemClass = styles.navButton
    return (
      <div className={classNames(styles.navContainer, styles.slidedUpNav)}>
        <div className={classNames(styles.navLeft, styles.fadeRight)}>
          <Link className={navItemClass} to="/"><img src="/asset/navbar-fixed-top-logo.svg" /></Link>
          <div className={burgerIconClass} onClick={()=> { this.setState( { open: !this.state.open } )}}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className={classNames(styles.navRight, styles.fadeLeft)}>
          <FacebookButton className={navItemClass} url={cUrl} appId={appId}>
            <img src="/asset/fb.svg" />
          </FacebookButton>
          <TwitterButton className={navItemClass} url={cUrl}>
            <img src="/asset/twitter.svg" />
          </TwitterButton>
          <a target="_blank" className={styles.donateButton} href="https://twreporter.backme.tw/cashflow/checkout?project_id=175&reward_id=718">
            <img className={styles.donateIcon} src="/asset/donate.svg"/>贊助我們
          </a>
        </div>
      </div>
    )
  }

  render() {
    const { bgStyle, header, isScrolledOver } = this.props
    const cUrl = getAbsPath(this.context.location.pathname,this.context.location.search)
    let backgroundColor = '#FFF'
    let logo = '/asset/logo-desk.svg'

    let burgerIconClass = styles.navIcon

    if (bgStyle === 'dark') {
      backgroundColor = '#3e3a39'
      logo = '/asset/logo-desk-dark.svg'
    }

    if (this.state.open) {
      burgerIconClass = classNames(styles.navIcon, styles.iconOpen)
    }

    let menuBar = this._renderAritcleFirst(burgerIconClass, logo)
    if (isScrolledOver && header.pageType === page.ARTICLE) {
      menuBar = this._renderAritcleSecond(burgerIconClass, cUrl)
    }

    return (
      <div className="nav-menu" style={{ backgroundColor: backgroundColor }}>
        {menuBar}
      </div>
    )
  }
}

DesktopNavBar.contextTypes = {
  location: React.PropTypes.object
}

DesktopNavBar.propTypes = {
  path: React.PropTypes.string
}
