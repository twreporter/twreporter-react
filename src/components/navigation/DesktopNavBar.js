import { appId, donatePath, colors } from '../../lib/constants'
import { FacebookButton, TwitterButton } from 'react-social'
import { getAbsPath } from '../../lib/url-transformer'
import { Link } from 'react-router'
import * as page from '../../constants/page-types'
import classNames from 'classnames'
import donateIcon from '../../../static/asset/donate.svg'
import fbIcon from '../../../static/asset/fb.svg'
import logoIcon from '../../../static/asset/logo-desk.svg'
import logoIconDark from '../../../static/asset/logo-desk-dark.svg'
import React, { Component } from 'react'
import smallLogo from '../../../static/asset/navbar-fixed-top-logo.svg'
import styles from './DesktopNavBar.scss'
import twitterIcon from '../../../static/asset/twitter.svg'

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

  _renderAritcleFirst(burgerMenu, logo) {
    return (
      <div className={styles.navContainer}>
        <div className={styles.navLeft}>
          {burgerMenu}
        </div>
        <div className={styles.navCenter}>
          <Link className={styles.navLogo} to="/"><img src={logo} /></Link>
        </div>
        <div className={styles.navRight}>
          <a target="_blank" className={styles.donateButton} href={donatePath}>
            <img className={styles.donateIcon} src="/asset/donate.svg"/>贊助我們
          </a>
        </div>
      </div>
    )
  }

  _renderAritcleSecond(burgerMenu, cUrl) {
    const navItemClass = styles.navButton
    return (
      <div className={classNames(styles.navContainer, styles.slidedUpNav)}>
        <div className={classNames(styles.navLeft, styles.fadeRight)}>
          <Link className={navItemClass} to="/"><img src={smallLogo} /></Link>
          {burgerMenu}
          <span className={styles.articleTitle}>{this.props.pageTitle}</span>
        </div>
        <div className={classNames(styles.navRight, styles.fadeLeft)}>
          <FacebookButton className={navItemClass} url={cUrl} appId={appId}>
            <img src={fbIcon} />
          </FacebookButton>
          <TwitterButton className={navItemClass} url={cUrl}>
            <img src={twitterIcon} />
          </TwitterButton>
          <a target="_blank" className={styles.donateButton} href={donatePath}>
            <img className={styles.donateIcon} src={donateIcon}/>贊助我們
          </a>
        </div>
      </div>
    )
  }

  render() {
    const { bgStyle, header, isScrolledOver } = this.props
    const cUrl = getAbsPath(this.context.location.pathname, this.context.location.search)
    let backgroundColor = colors.whiteBg
    let logo = logoIcon

    let burgerIconClass = styles.navIcon
    if (this.state.open) {
      burgerIconClass = classNames(styles.navIcon, styles.iconOpen)
    }

    let burgerMenu = <div className={burgerIconClass} onClick={()=> { this.setState( { open: !this.state.open } )}}>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>

    if (bgStyle === 'dark') {
      backgroundColor = colors.darkBg
      logo = logoIconDark
    }



    let menuBar = this._renderAritcleFirst(burgerMenu, logo)
    if (isScrolledOver && header.pageType === page.ARTICLE) {
      menuBar = this._renderAritcleSecond(burgerMenu, cUrl)
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
