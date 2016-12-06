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
    return (
      <div>
        <NavMenu {...this.props}
          isScrolledOver={this.state.isScrolledOver}
          pageTitle={this.props.pageTitle}
          pageTopic={this.props.pageTopic}
          articleId={this.props.articleId}
          />
      </div>
    )
  }

  render() {
    const { height, isScrolledOver } = this.state
    const { readPercent, pageType } = this.props

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
  articleId: PropTypes.string,
  readPercent: PropTypes.number,
  pageTopic: PropTypes.string,
  pageType: PropTypes.string,
  pathname: PropTypes.string.isRequired
}

NavBar.defaultProps = {
  articleId: '',
  readPercent: 0,
  pageTopic: '',
  pageType: '',
  pathname: ''
}

export default NavBar
