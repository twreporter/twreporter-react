import React, { Component } from 'react'
import { Link } from 'react-router'
import classNames from 'classnames'
import styles from './DesktopNavBar.scss'

if (process.env.BROWSER) {
  require('../../containers/NavBar.css')
}

export default class DesktopNavBar extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      open: false
    }
  }
  render() {
    const { bgStyle } = this.props
    let backgroundColor = '#FFF'
    let logo = '/asset/logo-desk.svg'

    let burgerIconClass = styles.navIcon

    if (bgStyle === 'dark') {
      backgroundColor = '#3e3a39'
      logo = '/asset/logo-desk-dark.svg'
    }

    if (this.state.open) {
      burgerIconClass = classNames(styles.navIcon, styles.iconOpen)
    }

    return (
      <div className="nav-menu" style={{ backgroundColor: backgroundColor }}>
        <div className={styles.navContainer}>
          <div className={styles.navLeft}>
            <div className={burgerIconClass} onClick={()=> { this.setState( { open: !this.state.open } )}}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <div className={styles.navCenter}>
            <Link className={styles.navLogo} to="/"><img src={logo} /></Link>
          </div>
          <div className={styles.navRight}>
            <a target="_blank" className={styles.donateButton} href="https://twreporter.backme.tw/cashflow/checkout?project_id=175&reward_id=718">
              <img className={styles.donateIcon} src="/asset/donate.svg"/>贊助我們
            </a>
          </div>
        </div>
      </div>
    )
  }
}

DesktopNavBar.propTypes = {
  path: React.PropTypes.string
}
