import React, { Component, PropTypes } from 'react'
import DesktopNavBar from './DesktopNavBar'
import MobileNavBar from './MobileNavBar'

if (process.env.BROWSER) {
  require('./NavBar.css')
  require('./NavBurg.css')
}

export default class NaviBar extends Component {
  constructor(props) {
    super(props)
    this._renderMobile = this._renderMobile.bind(this)
    this._render = this._render.bind(this)
  }
  _renderMobile() {
    return (
      <MobileNavBar bgStyle={this.props.bgStyle}/>
    )
  }
  _render() {
    return (
      <div>
        <div className="mobile-nav">
          {this._renderMobile()}
        </div>
        <div className="desktop-nav">
          <DesktopNavBar {...this.props}/>
        </div>
      </div>
    )
  }
  render() {
    const { device } = this.context
    return  device !== 'desktop' ? this._renderMobile() : this._render()
  }
}

NaviBar.contextTypes = {
  device: PropTypes.string
}
