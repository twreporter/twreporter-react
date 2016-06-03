'use strict'
import React, { Component } from 'react' // eslint-disable-line
import styles from './HeaderProgress.scss'

class HeaderProgress extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { percent } = this.props

    return (
      <div className={styles.progressOuter}>
        <div className={styles.progressbar}
          style={{ width: percent+'%' }}>
        </div>
      </div>
    )
  }
}

export default HeaderProgress
