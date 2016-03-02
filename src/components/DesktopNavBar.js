import React, { Component } from 'react'
import { Link } from 'react-router'
import classNames from 'classnames'
import { navPath } from '../lib/constants'
import SubNavBar from './SubNavBar'
import SearchBox from './SearchBox'

if (process.env.BROWSER) {
  require('./NavBar.css')
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
    let navLinks = []

    if (bgStyle === 'dark') {
      backgroundColor = '#3e3a39'
      color = '#FFF'
      logo = 'asset/logo_dark.png'
    }

    for (let i in navPath) {
      navLinks.push(<Link key={i} style={{ color: color }} to={navPath[i].path}><h1>{navPath[i].title}</h1></Link>)
    }

    return (
      <div className="nav-menu" style={{ backgroundColor: backgroundColor }}>
        <div className="nav-logo-category">
          <div className="nav-logo">
            <Link to="/"><img src={logo} height="50px" width="auto" /></Link>
            <div className="nav-category">
              <Items path={path} bgStyle={bgStyle}>
                {navLinks}
              </Items>
            </div>
            <SearchBox class="searchbox" style={{ width: '230px', display: path !== '/photography' ? 'inline-block' : 'none' }} path={path} />
          </div>
        </div>
        <SubNavBar {...this.props}/>
      </div>
    )
  }
}

DesktopNavBar.propTypes = {
  path: React.PropTypes.string
}
