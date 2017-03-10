import { ARTICLE_STYLE, BACK_TO_TOPIC, BRIGHT, DARK, LONGFORM_ARTICLE_STYLE, PHOTOGRAPHY_ARTICLE_STYLE, REVIEW_ARTICLE_STYLE, CHARACTERS_LIMIT, TOPIC,  donatePath, navPath, colors } from '../../constants/index'
import { Link } from 'react-router'
import { shortenString } from '../../utils/index'
import { isArticlePageType } from '../../utils/index'
import classNames from 'classnames'
import commonStyles from '../article/Common.scss'
import donateIcon from '../../../static/asset/icon-donation.svg'
import logoIcon from '../../../static/asset/logo-navbar-s.svg'
import logoIconDark from '../../../static/asset/logo-white-s.svg'
import navCommonStyles from './NavCommon.scss'
import Bookmarks from './Bookmarks'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import React, { Component, PropTypes } from 'react'
import ReactGA from 'react-ga'
import ReactDOM from 'react-dom'
import SearchBox from './SearchBox'
import SubNavBar from './SubNavBar'
import backToTopicIcon from '../../../static/asset/back-to-topic.svg'
import smallLogo from '../../../static/asset/navbar-fixed-top-logo.svg'
import styles from './NavMenu.scss'
import tocIcon from '../../../static/asset/icon-navbar-toc.svg'
import TopicPopup from './TopicPopup'

// lodash
import get from 'lodash/get'

const _ = {
  get
}

const TRIMMED_RATIO = CHARACTERS_LIMIT.HEADER_TITLE_TRIMMED_RATIO
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
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
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
    if(nextProps.pathname !== this.props.pathname) {
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
    const { pageTheme, pageType, pathname } = this.props
    let animateClass = this.state.isDown ? styles['slideDown'] : null
    let subNavBar = ( isArticlePageType(pageType) || this.state.open) ? null : <div className={styles['general-subnav']}><SubNavBar pathname={pathname} bgStyle={pageTheme}/></div>

    return (
      <div className={classNames(styles.navContainer, animateClass)}>
        <div className={styles.navLeft}>
          {burgerMenu}
          <DonateButton isSlidedUp={false} url={pathname}/>
        </div>
        <div className={styles.navCenter}>
          <Link className={styles.navLogo} to="/"><img src={logo} /></Link>
          <div className={styles.seoHidden}>{navLinks}</div>
        </div>
        <div className={styles.navRight}>
          {/*<Link className={styles.logoRight} to="/"><img src={smallLogo} /></Link>*/}
          <div className={styles.search}>
            <SearchBox />
          </div>
        </div>
        {subNavBar}
      </div>
    )
  }

  _renderAritcleSecond(burgerMenu) {
    const navItemClass = styles.navButton
    const { trimmedTitle } = this.state   // trimmed title
    const { pageTopic, pageTheme, showBackToTopicIcon, topicArr, topicSlug, pathname } = this.props
    const topicLength = _.get(topicArr, 'length', 0)
    const titleClass= pageTopic ? styles['topicTitleText'] : styles['articleTitleText']
    let topicRedBox = pageTopic ? <span className={commonStyles['topic-box']}>{pageTopic}</span> : null
    let topicCnt = (topicLength > 0) ? <div className={styles['topic-count']}> {topicLength} </div> : null
    let topicButton = null
    if (showBackToTopicIcon) {
      topicButton = (
        <Link to={`/topics/${topicSlug}`}>
          <div className={styles['back-to-topic']}>
            <img src={backToTopicIcon} />
            <span>{BACK_TO_TOPIC}</span>
          </div>
        </Link>
      )
    } else if (pageTopic) {
      topicButton = (
        <div className={classNames(navItemClass, styles['topic-dots'])} onClick={this._onTopicBtnClick}>
          <img src={tocIcon} /> {topicCnt}
        </div>
      )
    }

    return (
      <div className={classNames(styles.navContainer, styles.slidedUpNav)}>
        <div className={classNames(styles.navLeft, styles.slideUp)}>
          {burgerMenu}
          <DonateButton isSlidedUp={true} url={pathname}/>
        </div>
        <div className={classNames(styles.articleTitle, styles.fadeRight)}>
          <div className={classNames(titleClass, { [styles.photography]: pageTheme === DARK })} ref="title">
            {topicRedBox}
            {trimmedTitle}
          </div>
        </div>
        <div className={classNames(styles.navRight, styles.fadeLeft)}>
          {topicButton}
          <Link className={styles.logoRight} to="/"><img src={smallLogo} /></Link>
        </div>
      </div>
    )
  }

  _renderGeneralSecond(burgerMenu, navLinks) { // eslint-disable-line
    const isCatHidden = this.state.open ? styles['hide-category'] : null
    const { pathname } = this.props

    return (
      <div className={classNames(styles.navContainer, styles.slidedUpNav)}>
        <div className={classNames(styles.navLeft, styles.slideUp)}>
          {burgerMenu}
          <DonateButton isSlidedUp={true} url={pathname}/>
        </div>
        <div className={classNames(styles.articleTitle, styles.fadeRight, styles['slided-down-category'], 'hidden-xs', isCatHidden)}>
          <div className={styles['nav-category']}>
            {navLinks}
          </div>
        </div>
        <div className={classNames(styles.navRight, styles.fadeLeft)}>
          <Link className={styles.logoRight} to="/"><img src={smallLogo} /></Link>
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
          <div className={styles.search}>
            <SearchBox />
          </div>
        </div>
      </div>
    )
  }

  _renderLongformArticleSecond() {
    const { bookmarks } = this.props

    return (
      <div className={classNames(styles.navContainer, styles.slidedUpNav)}>
        <div className={classNames(styles.slideUp)}>
          <Bookmarks bookmarks={bookmarks} />
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
    const { pathname, isScrolledOver, pageTheme, pageType,  pageTopic, articleId, topicArr } = this.props
    let backgroundColor = colors.whiteBg
    let navTopBackground = isScrolledOver ? colors.superWhite : colors.whiteBg
    let logo = logoIcon
    let linkColor = colors.darkText
    let photographyClass

    let navLinks = []
    let burgerIconClass = styles.navIcon
    let navOuterClass = ''
    let subNavBar = null
    let topicPopup = null

    // generate category navigation bar
    let navItems = [].concat(navPath)
    navItems.unshift( { title: '首頁', path: '/' } )
    for (let i in navItems) {
      let itemClassName
      if (navItems[i].path === pathname) {
        itemClassName = styles.active
      }
      navLinks.push(<Link key={i} style={{ color: linkColor }}
        className={classNames(styles['menu-item'], itemClassName)} to={navItems[i].path}
        onClick={()=> { this.setState( { open: !this.state.open } )}}><span>{navItems[i].title}</span></Link>)
    }

    // if the burger icon is clicked
    if (this.state.open) {
      burgerIconClass = classNames(styles.navIcon, styles.iconOpen)
      subNavBar =
      <div className={styles.linkOuterContainer}>
        <div className={styles.catLinkContainer}>
          {navLinks}
        </div>
        <SubNavBar
          onClick={() => {this.setState( { open: !this.state.open } )}}
          pathname={pathname}
          bgStyle={pageTheme}
        />
      </div>

      // change the color of the navbar
      navOuterClass = navCommonStyles['nav-scrolled-outer']
    }

    let burgerMenu = <div className={burgerIconClass} onClick={()=> { this.setState( { open: !this.state.open } )}}>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>

    if (!this.state.open && (pageTheme === DARK)) {
      backgroundColor = colors.darkBg
      navTopBackground = colors.darkBg
      logo = logoIconDark
      linkColor = colors.whiteBg
      photographyClass = styles['photography']
    }

    let menuBar = this._renderAritcleFirst(burgerMenu, logo, navLinks)

    // if the page has been scrolled down, show another menu
    if (isScrolledOver && (pageType === ARTICLE_STYLE || pageType === PHOTOGRAPHY_ARTICLE_STYLE || pageType === REVIEW_ARTICLE_STYLE)) {
      menuBar = this._renderAritcleSecond(burgerMenu)
    } else if (isScrolledOver && pageType === TOPIC) {
      menuBar = this._renderTopicSecond(burgerMenu, navLinks)
    } else if (isScrolledOver && pageType === LONGFORM_ARTICLE_STYLE) {
      menuBar = this._renderLongformArticleSecond()
    } else if (isScrolledOver) {
      menuBar = this._renderGeneralSecond(burgerMenu, navLinks)
    }

    if (isScrolledOver) {
      navOuterClass = navCommonStyles['nav-scrolled-outer']
    }

    if ( (pageType === ARTICLE_STYLE || pageType === PHOTOGRAPHY_ARTICLE_STYLE) && pageTopic) {
      topicPopup = <TopicPopup isOpen={this.state.isTopicOpen}
          topicArr={topicArr}
          pageTopic={pageTopic}
          articleId={articleId}
          onTopicBtnClick={this._onTopicBtnClick}/>
    }

    return (
      <div style={{ backgroundColor: backgroundColor }}>
        <div className={classNames(navCommonStyles['nav-menu'], navOuterClass, photographyClass)} style={{ backgroundColor: navTopBackground }}>
          {menuBar}
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
  return (
    <Link target="_blank" title="贊助我們" className={classNames(styles.donateButton, dClass)} href={donatePath}
      onClick={()=>{
        ReactGA.event({
          category: 'HeaderDonateButton',
          action: 'Click',
          label: props.url
        })
      }}
    >
      <img src={donateIcon} />
      <span>贊助我們</span>
    </Link>
  )
}

NavMenu.contextTypes = {
  location: React.PropTypes.object
}

NavMenu.propTypes = {
  articleId: React.PropTypes.string,
  showBackToTopicIcon: React.PropTypes.bool,
  bookmarks: PropTypes.arrayOf(PropTypes.shape({
    style: PropTypes.string,
    slug: PropTypes.string,
    bookmark: PropTypes.string,
    bookmarkOrder: PropTypes.number,
    publishedDate: PropTypes.string,
    isSelected: PropTypes.bool
  })),
  isScrolledOver: PropTypes.bool,
  pageTheme: PropTypes.string,
  pageType: PropTypes.string,
  pageTitle: PropTypes.string,
  pageTopic: PropTypes.string,
  pathname: PropTypes.string,
  topicArr: PropTypes.arrayOf(PropTypes.object),
  topicSlug: PropTypes.string
}

NavMenu.defaultProps = {
  articleId: '',
  showBackToTopicIcon: false,
  bookmarks: [],
  isScrolledOver: false,
  pageTheme: BRIGHT,
  pageTopic: '',
  pageType: '',
  pathname: '',
  topicArr: [],
  topicSlug: ''
}
