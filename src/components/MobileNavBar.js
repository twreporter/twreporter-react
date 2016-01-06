import React, { Component } from 'react'
import { Link } from 'react-router'
import Sticky from 'react-sticky'
// import { categoryPath } from '../lib/constants'

// require('react-burger-menu').slide

if (process.env.BROWSER) {
  require('./NavBar.css')
  require('./NavBurg.css')
}

export default class MobileNaviBar extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    // const { taiwanPath, reviewPath, photographyPath, intlPath } = categoryPath
    let backgroundColor = '#FFF'
    let logo = '/asset/logo.png'
    if (this.props.bgStyle === 'dark') {
      backgroundColor = '#3e3a39'
      logo = 'asset/logo_dark.png'
    }

    return (
      <Sticky topOffset={300}>
        <div style= {{ backgroundColor: backgroundColor }}>
          <div className="nav-logo">
            <Link to="/"><img src={logo} /></Link>
          </div>
        </div>
      </Sticky>
    )
  }
}
