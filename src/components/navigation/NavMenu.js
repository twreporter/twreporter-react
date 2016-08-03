import { ARTICLE, appId, donatePath, navPath, colors } from '../../constants/index'
import { getAbsPath } from '../../lib/url-transformer'
import { Link } from 'react-router'
import classNames from 'classnames'
import commonStyles from '../article/Common.scss'
import donateIcon from '../../../static/asset/icon-donation.svg'
import logoIcon from '../../../static/asset/logo-navbar-s.svg'
import logoIconDark from '../../../static/asset/logo-white-s.svg'
import navCommonStyles from './NavCommon.scss'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import SearchBox from './SearchBox'
import smallLogo from '../../../static/asset/navbar-fixed-top-logo.svg'
import styles from './NavMenu.scss'
import SubNavBar from './SubNavBar'
import tocIcon from '../../../static/asset/icon-navbar-toc.svg'
import TopicPopup from './TopicPopup'

const TRIMMED_RATIO = 0.5 

export default class NavMenu extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      open: false,
      windowWidth: 200,
      trimmedTitle: '',
      isDown: false,
      isTopicOpen: false
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
    const { pageTitle, pageTopic } = this.props
    const topicOffset = pageTopic ? pageTopic.length : 0

    if(titleSpan) {
      let fontSize = Number(getComputedStyle(titleSpan, '').fontSize.match(/(\d*(\.\d*)?)px/)[1])
      if(!fontSize || fontSize < 0) {
        fontSize = 18
      } 
      const wordCnt = (this.state.windowWidth * TRIMMED_RATIO / fontSize) - topicOffset
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
    const { pageTopic } = this.props
    let topicBox = pageTopic ? <span className={commonStyles['topic-box']}>{pageTopic}</span> : null

    return (
      <div className={classNames(styles.navContainer, styles.slidedUpNav)}>
        <div className={classNames(styles.navLeft, styles.slideUp)}>
          {burgerMenu}
          <DonateButton isSlidedUp={true}/>
        </div>
        <div className={classNames(styles.articleTitle, styles.fadeRight)}>
          <div className={classNames(styles.articleTitleText)} ref="title">
            {topicBox}
            {trimmedTitle}
          </div>
        </div>
        <div className={classNames(styles.navRight, styles.fadeLeft)}>
          <div className={navItemClass} url={cUrl} appId={appId} onClick={this._onTopicBtnClick.bind(this)}>
            <img src={tocIcon} />
          </div>
        </div>
      </div>
    )
  }

  _onTopicBtnClick() {
    this.setState({ isTopicOpen: !this.state.isTopicOpen })
  }

  render() {
    const { path, bgStyle, header, isScrolledOver, pageTopic } = this.props
    const cUrl = getAbsPath(this.context.location.pathname, this.context.location.search)
    let backgroundColor = colors.whiteBg
    let navTopBackground = isScrolledOver ? colors.superWhite : colors.whiteBg
    let logo = logoIcon
    let linkColor = colors.darkBg

    let navLinks = []
    let burgerIconClass = styles.navIcon
    let navOuterClass = ''
    let subNavBar = null
    let searchClass = ''

    // generate category navigation bar
    let navItems = [].concat(navPath)
    navItems.unshift( { title: '首頁', path: '/' } )
    for (let i in navItems) {
      let itemClassName
      if (navItems[i].path === path) {
        itemClassName = styles.active
      }
      navLinks.push(<Link key={i} style={{ color: linkColor }} 
        className={classNames(styles['menu-item'], itemClassName)} to={navItems[i].path} 
        onClick={()=> { this.setState( { open: !this.state.open } )}}><h1>{navItems[i].title}</h1></Link>)
    }

    // if the burger icon is clicked
    if (this.state.open) {
      burgerIconClass = classNames(styles.navIcon, styles.iconOpen)
      subNavBar = 
      <div className={styles.linkOuterContainer}>
        <div className={styles.catLinkContainer}>
          {navLinks}
        </div>
        <SubNavBar {...this.props}/>
      </div>

      // change the color of the navbar
      navOuterClass = navCommonStyles['nav-scrolled-outer']
    } else {
      searchClass = 'hidden'
    }

    let burgerMenu = <div className={burgerIconClass} onClick={()=> { this.setState( { open: !this.state.open } )}}>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>

    if (bgStyle === 'dark' && !this.state.open) {
      backgroundColor = colors.darkBg
      navTopBackground = colors.darkBg
      logo = logoIconDark
      linkColor = colors.whiteBg
    }

    let menuBar = this._renderAritcleFirst(burgerMenu, logo)
    let searchBox = 
      <div className={classNames(styles.topBar, searchClass)}>
        <SearchBox style={{ width: '260px', marginTop: '-5px', display: 'inline-block' }} path={path} />
      </div>
      
    // if the page has been scrolled down, show another menu
    if (isScrolledOver && header.pageType === ARTICLE) {
      menuBar = this._renderAritcleSecond(burgerMenu, cUrl)
      navOuterClass = navCommonStyles['nav-scrolled-outer']
    }

    return (
      <div style={{ backgroundColor: backgroundColor }}>
        <div className={classNames(navCommonStyles['nav-menu'], navOuterClass)} style={{ backgroundColor: navTopBackground }}>
          {menuBar}
          {searchBox}
          {subNavBar}
        </div>
        <TopicPopup isOpen={this.state.isTopicOpen} 
          topicArr={header.topicArr}
          pageTopic={pageTopic}
          onTopicBtnClick={this._onTopicBtnClick.bind(this)}/>
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

NavMenu.contextTypes = {
  location: React.PropTypes.object
}

NavMenu.propTypes = {
  path: React.PropTypes.string,
  pageTitle: React.PropTypes.string,
  pageTopic: React.PropTypes.string
}
