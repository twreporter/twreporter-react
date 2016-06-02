import _ from 'lodash'
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import DesktopNavBar from './DesktopNavBar'
import HeaderProgress from './HeaderProgress'
import MobileNavBar from './MobileNavBar'

const DEFAULT_HEIGHT = 10

if (process.env.BROWSER) {
  require('./NavBar.css')
  require('./NavBurg.css')
}

export default class NaviBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      height: 10
    }
    this._renderMobile = this._renderMobile.bind(this)
    this._getHeaderHeight = this._getHeaderHeight.bind(this)
  }

  componentDidMount() {
    this._getHeaderHeight()
    window.addEventListener('resize', this._getHeaderHeight)
  }

  _getHeaderHeight() {
    const rect = ReactDOM.findDOMNode(this.refs.headerbox).getBoundingClientRect()
    this.setState({
      height: _.get(rect, 'height', DEFAULT_HEIGHT)
    })
  }

  shouldComponentUpdate(nextProps, nextState) { // eslint-disable-line
    if(nextState.height !== this.state.height) {
      return true
    }
    if (nextProps.path === this.props.path) {
      return false
    }
    return true
  }

  _renderMobile() {
    return (
      <div className="mobile-nav">
        <MobileNavBar {...this.props}/>
      </div>
    )
  }

  _renderDesktop() {
    return (
      <div className="desktop-nav">
        <DesktopNavBar {...this.props}/>
      </div>
    )
  }

  render() {
    const { height } = this.state

    return (
      <div style={{ height: height+'px' }}>
        <div ref="headerbox" className="fixTop">
          {this._renderMobile()}
          {this._renderDesktop()}
          <HeaderProgress />
        </div>
      </div>
    )
  }
}

NaviBar.contextTypes = {
  device: PropTypes.string
}
