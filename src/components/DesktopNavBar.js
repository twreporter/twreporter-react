import React, { Component } from 'react'
import { Link } from 'react-router'
import classNames from 'classnames'

if (process.env.BROWSER) {
  require('./NavBar.css')
}

const taiwanPath = '/category/taiwan'
const reviewPath = '/category/review'
const photographyPath = '/photography'
const mediaPath = '/category/media'

class Items extends Component {
  render() {
    const { children, path, bgStyle } = this.props
    let style = {
      borderColor: bgStyle === 'dark' ? '#FFF' : '#000'
    }
    let _children = []
    children.map((child, i) => {
      let itemClassName
      if (child.props.to === path) {
        itemClassName = 'selected-menu-item'
      }
      _children.push(
        <li className={classNames('menu-item', itemClassName)} style={style} key={i}>
          {child}
        </li>
      )
    })
    return (
      <ul className="menu-items">
        {_children}
      </ul>
    )
  }
}

export default class DesktopNavBar extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { bgStyle } = this.props
    const catStyle = {}
    let logo = '/asset/logo.png'
    if (bgStyle === 'dark') {
      catStyle.color = '#FFFFFF'
      logo = 'asset/logo_dark.png'
    }
    return (
      <div className="nav-menu">
        <div className="nav-logo-category">
          <div className="nav-logo">
            <Link to="/"><img src={logo} height="50px" width="auto" /></Link>
          </div>
          <div className="nav-category">
            <Items path={this.props.path} bgStyle={bgStyle}>
              <Link style={catStyle} to={taiwanPath}><h1>台灣</h1></Link>
              <Link style={catStyle} to={reviewPath}><h1>觀點</h1></Link>
              <Link style={catStyle} to={photographyPath}><h1>影像</h1></Link>
              <Link style={catStyle} to={mediaPath}><h1>新媒體</h1></Link>
            </Items>
          </div>
        </div>
      </div>
    )
  }
}

DesktopNavBar.propTypes = {
  path: React.PropTypes.string
}
