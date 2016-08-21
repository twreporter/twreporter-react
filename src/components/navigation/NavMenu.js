import _ from 'lodash'
import { ARTICLE, PHOTOGRAPHY, PHOTOGRAPHY_ARTICLE, TOPIC, appId, donatePath, navPath, colors } from '../../constants/index'
import { getAbsPath } from '../../utils/index'
import { Link } from 'react-router'
import { shortenString } from '../../lib/string-processor'
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
const FULL_WIDTH = 1200

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
    this._onTopicBtnClick = this._onTopicBtnClick.bind(this)
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
      this._checkIfPopupShown(this.state.isOpen)
    }

    // close the topic popup if user switch to different page
    if(nextProps.path !== this.props.path) {
      this.setState({ trimmedTitle: '', isTopicOpen: false })
      this.setState({ open: false })
      this._checkIfPopupShown(this.state.isOpen)
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
    const { windowWidth } = this.state
    const topicOffset = pageTopic ? pageTopic.length : 0

    if(titleSpan && pageTitle) {
      let fontSize = Number(getComputedStyle(titleSpan, '').fontSize.match(/(\d*(\.\d*)?)px/)[1])
      if(!fontSize || fontSize < 0) {
        fontSize = 18
      }
      let wordCnt = (this.state.windowWidth * TRIMMED_RATIO / fontSize) - topicOffset
      if(windowWidth > 0 && windowWidth < FULL_WIDTH) {
        wordCnt = Math.round(wordCnt * (windowWidth / FULL_WIDTH))
      }
      let titleText = pageTitle
      if(pageTitle.length > wordCnt) {
        titleText = shortenString(pageTitle, wordCnt) + '...'
      }

      this.setState({ trimmedTitle: titleText })
    }
  }

  _renderAritcleFirst(burgerMenu, logo, navLinks) {
    const { header } = this.props
    const pageType = _.get(header, 'pageType', null)
    let animateClass = this.state.isDown ? styles['slideDown'] : null
    let subNavBar = (!pageType || pageType === ARTICLE || pageType === PHOTOGRAPHY_ARTICLE || this.state.open) ? null : <div className={styles['general-subnav']}><SubNavBar {...this.props}/></div>

    return (
      <div className={classNames(styles.navContainer, animateClass)}>
        <div className={styles.navLeft}>
          {burgerMenu}
          <DonateButton isSlidedUp={false}/>
        </div>
        <div className={styles.navCenter}>
          <Link className={styles.navLogo} to="/"><img src={logo} /></Link>
          <div className={styles.seoHidden}>{navLinks}</div>
        </div>
        <div className={styles.navRight}>
          <Link className={styles.logoRight} to="/"><img src={smallLogo} /></Link>
        </div>
        {subNavBar}
      </div>
    )
  }

  _renderAritcleSecond(burgerMenu, cUrl) {
    const navItemClass = styles.navButton
    const { trimmedTitle } = this.state   // trimmed title
    const { pageTopic, header } = this.props
    const topicLength = _.get(header, 'topicArr', []).length
    const pageType = _.get(header, 'pageType')
    const titleClass= pageTopic ? styles['topicTitleText'] : styles['articleTitleText']
    let topicRedBox = pageTopic ? <span className={commonStyles['topic-box']}>{pageTopic}</span> : null
    let topicCnt = (topicLength > 0) ? <div className={styles['topic-count']}> {topicLength} </div> : null
    let topicButton = pageTopic ? <div className={navItemClass} url={cUrl} appId={appId} onClick={this._onTopicBtnClick}>
            <img src={tocIcon} /> {topicCnt}
          </div> : null


    return (
      <div className={classNames(styles.navContainer, styles.slidedUpNav)}>
        <div className={classNames(styles.navLeft, styles.slideUp)}>
          {burgerMenu}
          <DonateButton isSlidedUp={true}/>
        </div>
        <div className={classNames(styles.articleTitle, styles.fadeRight)}>
          <div className={classNames(titleClass, { [styles.photography]: pageType === PHOTOGRAPHY_ARTICLE })} ref="title">
            {topicRedBox}
            {trimmedTitle}
          </div>
        </div>
        <div className={classNames(styles.navRight, styles.fadeLeft)}>
          {topicButton}
        </div>
      </div>
    )
  }

  _renderGeneralSecond(burgerMenu, navLinks) { // eslint-disable-line
    const isCatHidden = this.state.open ? styles['hide-category'] : null

    return (
      <div className={classNames(styles.navContainer, styles.slidedUpNav)}>
        <div className={classNames(styles.navLeft, styles.slideUp)}>
          {burgerMenu}
          <DonateButton isSlidedUp={true}/>
        </div>
        <div className={classNames(styles.articleTitle, styles.fadeRight, styles['slided-down-category'], 'visible-lg', isCatHidden)}>
          <div className={styles['nav-category']}>
            {navLinks}
          </div>
        </div>
        <div className={classNames(styles.navRight, styles.fadeLeft)}>
        </div>
      </div>
    )
  }

  _renderTopicSecond(burgerMenu, navLinks) { // eslint-disable-line
    const { pageTopic } = this.state   // trimmed title
    const { pageTitle } = this.props
    const titleClass= pageTopic ? styles['topicTitleText'] : styles['articleTitleText']
    let topicRedBox = pageTopic ? <span className={commonStyles['topic-box']}>{pageTopic}</span> : null

    return (
      <div className={classNames(styles.navContainer, styles.slidedUpNav)}>
        <div className={classNames(styles.navLeft, styles.slideUp)}>
          {burgerMenu}
          <DonateButton isSlidedUp={true}/>
        </div>
        <div className={classNames(styles.articleTitle, styles.fadeRight)}>
          <div className={titleClass} ref="title">
            {topicRedBox}
            {pageTitle}
          </div>
        </div>
        <div className={classNames(styles.navRight, styles.fadeLeft)}>
        </div>
      </div>
    )
  }

  _onTopicBtnClick() {
    const isOpen = !this.state.isTopicOpen
    this.setState({ isTopicOpen: isOpen })
    this._checkIfPopupShown(isOpen)
  }

  _checkIfPopupShown(isOpen) {
    // disable the page scrolling function if the Topic popup is being open
    if(isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }

  render() {
    const { path, bgStyle, header, isScrolledOver, pageTopic, articleId } = this.props
    const cUrl = getAbsPath(this.context.location.pathname, this.context.location.search)
    let backgroundColor = colors.whiteBg
    let navTopBackground = isScrolledOver ? colors.superWhite : colors.whiteBg
    let logo = logoIcon
    let linkColor = colors.darkBg
    let photographyClass

    let navLinks = []
    let burgerIconClass = styles.navIcon
    let navOuterClass = ''
    let subNavBar = null
    let searchClass = ''
    let topicPopup = null

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
        <SubNavBar onClick={() => {this.setState( { open: !this.state.open } )}} {...this.props}/>
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

    if (!this.state.open && (bgStyle === 'dark' || header.pageType === PHOTOGRAPHY || header.pageType === PHOTOGRAPHY_ARTICLE)) {
      backgroundColor = colors.darkBg
      navTopBackground = colors.darkBg
      logo = logoIconDark
      linkColor = colors.whiteBg
      photographyClass = styles['photography']
    }

    let menuBar = this._renderAritcleFirst(burgerMenu, logo, navLinks)
    let searchBox =
      <div className={classNames(styles.topBar, searchClass)}>
        <SearchBox style={{ width: '260px', marginTop: '-5px', display: 'inline-block' }} path={path} />
      </div>

    // if the page has been scrolled down, show another menu
    if (isScrolledOver && (header.pageType === ARTICLE || header.pageType === PHOTOGRAPHY_ARTICLE)) {
      menuBar = this._renderAritcleSecond(burgerMenu, cUrl)
    } else if (isScrolledOver && header.pageType === TOPIC) {
      menuBar = this._renderTopicSecond(burgerMenu, navLinks)
    } else if (isScrolledOver) {
      menuBar = this._renderGeneralSecond(burgerMenu, navLinks)
    }

    if (isScrolledOver) {
      navOuterClass = navCommonStyles['nav-scrolled-outer']
    }

    if (header.pageType === ARTICLE && pageTopic) {
      topicPopup = <TopicPopup isOpen={this.state.isTopicOpen}
          topicArr={header.topicArr}
          pageTopic={pageTopic}
          articleId={articleId}
          onTopicBtnClick={this._onTopicBtnClick}/>
    }

    return (
      <div style={{ backgroundColor: backgroundColor }}>
        <div className={classNames(navCommonStyles['nav-menu'], navOuterClass, photographyClass)} style={{ backgroundColor: navTopBackground }}>
          {menuBar}
          {searchBox}
          {subNavBar}
        </div>
        {topicPopup}
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
