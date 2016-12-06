import { ARTICLE_STYLE, DEFAULT_HEADER_HEIGHT, PHOTOGRAPHY_ARTICLE_STYLE, LONGFORM_ARTICLE_STYLE } from '../../constants/index'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import NavMenu from './NavMenu'
import HeaderProgress from './HeaderProgress'
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import styles from './NavBar.scss'

// lodash
import debounce from 'lodash/debounce'
import get from 'lodash/get'

const _ = {
  debounce,
  get
}

class NavBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      height: DEFAULT_HEADER_HEIGHT,
      isScrolledOver: false
    }
    this._getHeaderHeight = this._getHeaderHeight.bind(this)
    this._handleScroll = this._handleScroll.bind(this)
    this.debouncedScroll = _.debounce(() => { this._handleScroll() }, 50, { 'maxWait': 150 })
    this.getDebouncedHeight = _.debounce(() => { this._getHeaderHeight() }, 100, { 'maxWait': 300 })
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  componentDidMount() {
    this._getHeaderHeight()
    window.addEventListener('resize', this.getDebouncedHeight)

    // detect sroll position
    window.addEventListener('scroll', this.debouncedScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.getDebouncedHeight)
    window.removeEventListener('scroll', this.debouncedScroll)
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.pathname !== nextProps.pathname) {
      this.setState({ isScrolledOver: false })
    }
  }

  componentDidUpdate() {
    if(!this.state.isScrolledOver) {
      this._getHeaderHeight()
    }
  }

  _handleScroll() {
    const scrollPos = window.scrollY
    const sThreshold = this.state.height / 2
    if(scrollPos > sThreshold && !this.state.isScrolledOver) {
      this.setState({ isScrolledOver: true })
    } else if(scrollPos <= sThreshold && this.state.isScrolledOver) {
      this.setState({ isScrolledOver: false })
    }
  }

  _getHeaderHeight() {
    const rect = ReactDOM.findDOMNode(this.refs.headerbox).getBoundingClientRect()
    let hHeight = _.get(rect, 'height', DEFAULT_HEADER_HEIGHT)
    hHeight = (hHeight < DEFAULT_HEADER_HEIGHT) ? DEFAULT_HEADER_HEIGHT : hHeight
    this.setState({
      height: hHeight
    })
  }


  _renderMenu() {
    const { pathname, header } = this.props
    return (
      <div>
        <NavMenu
          pathname={pathname}
          {...header}
          isScrolledOver={this.state.isScrolledOver}
        />
      </div>
    )
  }

  render() {
    const { height, isScrolledOver } = this.state
    const readPercent = _.get(this.props, 'header.readPercent', 0)
    const pageType = _.get(this.props, 'header.pageType', '')

    let progressBar = (pageType === ARTICLE_STYLE || pageType === PHOTOGRAPHY_ARTICLE_STYLE || pageType === LONGFORM_ARTICLE_STYLE) && isScrolledOver ? <HeaderProgress percent={readPercent}/> : null

    return (
      <div style={{ height: height+'px' }}>
        <div ref="headerbox" className={styles.fixTop}>
          {this._renderMenu()}
          {progressBar}
        </div>
      </div>
    )
  }
}

NavBar.propTypes = {
  header: PropTypes.shape({
    articleId: PropTypes.string,
    bookmarks: PropTypes.array,
    readPercent: PropTypes.number,
    pageTopic: PropTypes.string,
    pageType: PropTypes.string,
    topicArr: PropTypes.array
  }),
  pathname: PropTypes.string.isRequired
}

NavBar.defaultProps = {
  header: {
    articleId: '',
    bookmarks: [],
    readPercent: 0,
    pageType: '',
    pageTopic: '',
    topicArr: []
  },
  pathname: ''
}

export default NavBar
