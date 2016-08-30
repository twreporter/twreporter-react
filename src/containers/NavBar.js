import _ from 'lodash'
import { connect } from 'react-redux'
import { setReadProgress } from '../actions/header'
import { ARTICLE, PHOTOGRAPHY_ARTICLE, DEFAULT_HEADER_HEIGHT } from '../constants/index'
import NavMenu from '../components/navigation/NavMenu'
import HeaderProgress from '../components/navigation/HeaderProgress'
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import styles from './NavBar.scss'

class NavBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      height: DEFAULT_HEADER_HEIGHT,
      isScrolledOver: false,
      isPageChanged: false
    }
    this._getHeaderHeight = this._getHeaderHeight.bind(this)
    this._handleScroll = this._handleScroll.bind(this)
  }

  componentDidMount() {
    this._getHeaderHeight()
    window.addEventListener('resize', this._getHeaderHeight)

    // detect sroll position
    window.addEventListener('scroll', this._handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._getHeaderHeight)
    window.removeEventListener('scroll', this._handleScroll)
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.path !== nextProps.path) {
      this.setState({ isPageChanged: true })
    }
  }

  componentDidUpdate() {
    if(this.state.isPageChanged) {
      this._getHeaderHeight()
      this.setState({ isPageChanged: false })
    }
  }

  _handleScroll() {
    const scrollPos = window.scrollY
    if(scrollPos > this.state.height && !this.state.isScrolledOver) {
      this.setState({ isScrolledOver: true })
    } else if(scrollPos <= this.state.height && this.state.isScrolledOver) {
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

  shouldComponentUpdate(nextProps, nextState) { // eslint-disable-line
    // if(nextState.height !== this.state.height ||
    //    nextProps.header.readPercent !== this.props.header.readPercent ||
    //    nextState.isScrolledOver !== this.state.isScrolledOver) {
    //   return true
    // }
    // if (nextProps.path === this.props.path) {
    //   return false
    // }
    return true
  }

  _renderMenu() {
    return (
      <div>
        <NavMenu {...this.props}
          isScrolledOver={this.state.isScrolledOver}
          pageTitle={this.props.header.pageTitle}
          pageTopic={this.props.header.pageTopic}
          articleId={this.props.header.articleId}
          />
      </div>
    )
  }

  render() {
    const { height } = this.state
    const { header } = this.props
    const percent = header.readPercent || 0

    let progressBar = (header.pageType === ARTICLE || header.pageType === PHOTOGRAPHY_ARTICLE) ? <HeaderProgress percent={percent}/> : null

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

NavBar.contextTypes = {
  device: PropTypes.string
}

function mapStateToProps(state) {
  return {
    header: state.header || {}
  }
}

export default connect(mapStateToProps, { setReadProgress })(NavBar)
