import { ARTICLE, appId, donatePath, colors } from '../../constants/index'
import { getAbsPath } from '../../lib/url-transformer'
import { Link } from 'react-router'
import classNames from 'classnames'
import donateIcon from '../../../static/asset/icon-donation.svg'
import tocIcon from '../../../static/asset/icon-navbar-toc.svg'
import logoIcon from '../../../static/asset/logo-navbar-s.svg'
import logoIconDark from '../../../static/asset/logo-white-s.svg'
import SubNavBar from './SubNavBar'
import smallLogo from '../../../static/asset/navbar-fixed-top-logo.svg'
import styles from './DesktopNavBar.scss'
import navCommonStyles from './NavCommon.scss'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

const TRIMMED_RATIO = 0.5 

export default class DesktopNavBar extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      open: false,
      windowWidth: 200,
      trimmedTitle: '',
      isDown: false
    }

    this.handleResize = this._handleResize.bind(this)
    this.handleArticleTitle = this._handleArticleTitle.bind(this)
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.isScrolledOver) {
      this.setState({ isDown: true })
    }
    
    if(nextProps.pageTitle !== this.props.pageTitle) {
      this.setState({ trimmedTitle: '' })
    }

    if(this.state.trimmedTitle=='') {
      this.handleArticleTitle(nextProps.pageTitle)
    }
  }

  _handleResize() {
    this.setState({ windowWidth: window.innerWidth })

    // handle trimming problem for the article title
    this.handleArticleTitle()
  }

  _handleArticleTitle() {
    const titleSpan = ReactDOM.findDOMNode(this.refs.title)
    const { pageTitle } = this.props

    if(titleSpan) {
      let fontSize = Number(getComputedStyle(titleSpan, '').fontSize.match(/(\d*(\.\d*)?)px/)[1])
      if(!fontSize || fontSize < 0) {
        fontSize = 18
      } 
      const wordCnt = this.state.windowWidth * TRIMMED_RATIO / fontSize
      let titleText = pageTitle
      if(pageTitle.length > wordCnt) {
        titleText = pageTitle.substr(0, wordCnt-1) + '...'
      }
      
      this.setState({ trimmedTitle: titleText })
    }
  }

  _renderAritcleFirst(burgerMenu, logo) {
    let animateClass = this.state.isDown ? styles['slideDown'] : null

    return (
      <div className={classNames(styles.navContainer, animateClass)}>
        <div className={styles.navLeft}>
          {burgerMenu}
          <DonateButton isSlidedUp={false}/>
        </div>
        <div className={styles.navCenter}>
          <Link className={styles.navLogo} to="/"><img src={logo} /></Link>
        </div>
        <div className={styles.navRight}>
          <Link className={styles.logoRight} to="/"><img src={smallLogo} /></Link>
        </div>
      </div>
    )
  }

  _renderAritcleSecond(burgerMenu, cUrl) {
    const navItemClass = styles.navButton
    const { trimmedTitle } = this.state   // trimmed title

    return (
      <div className={classNames(styles.navContainer, styles.slidedUpNav)}>
        <div className={classNames(styles.navLeft, styles.slideUp)}>
          {burgerMenu}
          <DonateButton isSlidedUp={true}/>
        </div>
        <div className={classNames(styles.articleTitle, styles.fadeRight)}>
          <span className={classNames(styles.articleTitleText)} ref="title">{trimmedTitle}</span>
        </div>
        <div className={classNames(styles.navRight, styles.fadeLeft)}>
          <div className={navItemClass} url={cUrl} appId={appId}>
            <img src={tocIcon} />
          </div>
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
    let subNavBar = null

    // if the burger icon is clicked
    if (this.state.open) {
      burgerIconClass = classNames(styles.navIcon, styles.iconOpen)
      subNavBar = <SubNavBar {...this.props}/>
      
      // change the color of the navbar
      navOuterClass = navCommonStyles['nav-scrolled-outer']
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

    // if the page has been scrolled down, show another menu
    if (isScrolledOver && header.pageType === ARTICLE) {
      menuBar = this._renderAritcleSecond(burgerMenu, cUrl)
      navOuterClass = navCommonStyles['nav-scrolled-outer']
    }

    return (
      <div style={{ backgroundColor: backgroundColor }}>
        <div className={classNames(navCommonStyles['nav-menu'], navOuterClass)}>
          {menuBar}
          {subNavBar}
        </div>
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
