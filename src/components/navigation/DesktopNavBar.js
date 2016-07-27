import { ARTICLE, appId, donatePath, colors } from '../../constants/index'
import { getAbsPath } from '../../lib/url-transformer'
import { FacebookButton, TwitterButton } from 'react-social'
import { Link } from 'react-router'
import classNames from 'classnames'
import donateIcon from '../../../static/asset/icon-donation.svg'
import fbIcon from '../../../static/asset/fb.svg'
import logoIcon from '../../../static/asset/logo-desk.svg'
import logoIconDark from '../../../static/asset/logo-desk-dark.svg'
import smallLogo from '../../../static/asset/navbar-fixed-top-logo.svg'
import styles from './DesktopNavBar.scss'
import navCommonStyles from './NavCommon.scss'
import twitterIcon from '../../../static/asset/twitter.svg'
import React, { Component } from 'react'


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
          <DonateButton isSlidedUp={false}/>
        </div>
        <div className={styles.navCenter}>
          <Link className={styles.navLogo} to="/"><img src={logo} /></Link>
        </div>
        <div className={styles.navRight}>
          
        </div>
      </div>
    )
  }

  _renderAritcleSecond(burgerMenu, cUrl) {
    const navItemClass = styles.navButton
    const { pageTitle } = this.props
    return (
      <div className={classNames(styles.navContainer, styles.slidedUpNav)}>
        <div className={classNames(styles.navLeft, styles.slideUp)}>
          {burgerMenu}
          <DonateButton isSlidedUp={true}/>
          <span className={classNames(styles.articleTitle, styles.fadeRight)}>{pageTitle}</span>
        </div>
        <div className={classNames(styles.navRight, styles.fadeLeft)}>
          <FacebookButton className={navItemClass} url={cUrl} appId={appId}>
            <img src={fbIcon} />
          </FacebookButton>
          <TwitterButton className={navItemClass} message={pageTitle} url={cUrl}>
            <img src={twitterIcon} />
          </TwitterButton>
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
    let navOuterClass = ''
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
    if (isScrolledOver && header.pageType === ARTICLE) {
      menuBar = this._renderAritcleSecond(burgerMenu, cUrl)
      navOuterClass = navCommonStyles['nav-scrolled-outer']
    }

    return (
      <div className={classNames(navCommonStyles['nav-menu'], navOuterClass)}>
        {menuBar}
      </div>
    )
  }
}

const DonateButton = (props) => {
  const { isSlidedUp } = props
  const dClass = isSlidedUp ? styles['up'] : null
  return <a target="_blank" title="贊助我們" className={classNames(styles.donateButton, dClass)} href={donatePath}>
            <img src={donateIcon} />
            <span>贊助我們</span>
          </a>
}

DesktopNavBar.contextTypes = {
  location: React.PropTypes.object
}

DesktopNavBar.propTypes = {
  path: React.PropTypes.string
}
