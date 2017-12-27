'use strict'
import MobileDetect from 'mobile-detect'
import React from 'react'
import PrintIcon from '../../../static/asset/print.svg'
import styles from './PrintButton.scss'

class PrintButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isDesktop: false
    }
  }

  componentDidMount() {
    let md = new MobileDetect(window.navigator.userAgent)
    this.setState({
      isDesktop: (!md.mobile() && !md.tablet())
    })
  }

  _print() {
    window.print()
  }

  render() {
    const { isDesktop } = this.state
    if (isDesktop) {
      return (
        <button className={styles.bt} onClick={this._print}>
          <PrintIcon />
        </button>
      )
    } else {
      return null
    }
  }
}

export default PrintButton
