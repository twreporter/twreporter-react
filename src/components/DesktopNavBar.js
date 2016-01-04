import React, { Component } from 'react'
import { Link } from 'react-router'
import classNames from 'classnames'

if (process.env.BROWSER) {
  require('./NavBar.css')
}

const taiwanPath = '/category/taiwan'
const reviewPath = '/category/review'
const photographyPath = '/photography'
const intlPath = '/category/intl'

class SearchBox extends Component {
  constructor(props, context) {
    super(props, context)
  }
  render() {
    return (
      <div style={this.props.style}>
        <div dangerouslySetInnerHTML={{ __html: '<gcse:search></gcse:search>' }} />
      </div>
    )
  }
}

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
  constructor(props, context) {
    super(props, context)
  }
  render() {
    const { bgStyle, path } = this.props
    let backgroundColor = '#FFF'
    let color = '#000'
    let logo = '/asset/logo.png'
    if (bgStyle === 'dark') {
      backgroundColor = '#3e3a39'
      color = '#FFF'
      logo = 'asset/logo_dark.png'
    }
    return (
      <div className="nav-menu" style={{ backgroundColor: backgroundColor }}>
        <div className="nav-logo-category">
          <div className="nav-logo">
            <Link to="/"><img src={logo} height="50px" width="auto" /></Link>
            <SearchBox style={{ width: '230px', display: path === '/' ? 'inline-block' : 'none' }} path={path} />
          </div>
          <div className="nav-category">
            <Items path={path} bgStyle={bgStyle}>
              <Link style={{ color: color }} to={taiwanPath}><h1>台灣</h1></Link>
              <Link style={{ color: color }} to={reviewPath}><h1>觀點</h1></Link>
              <Link style={{ color: color }} to={photographyPath}><h1>影像</h1></Link>
              <Link style={{ color: color }} to={intlPath}><h1>國際兩岸</h1></Link>
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
