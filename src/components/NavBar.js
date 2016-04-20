/* eslint no-unused-vars:1 */
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
  shouldComponentUpdate(nextProps, nextState) {
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
  _render() {
    return (
      <div>
        {this._renderMobile()}
        {this._renderDesktop()}
      </div>
    )
  }
  render() {
    // const { device } = this.context
    // return  device !== 'mobile' ? this._renderDesktop() : this._renderMobile()
    return this._render()
  }
}

NaviBar.contextTypes = {
  device: PropTypes.string
}
