'use strict'
import { connect } from 'react-redux'
import React, { Component } from 'react' // eslint-disable-line
import styles from './HeaderProgress.scss'
import { setReadProgress } from '../actions/header'

class HeaderProgress extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { header } = this.props
    const percent = header.readPercent || 0

    return (
      <div className={styles.progressOuter}>
        <div className={styles.progressbar}
          style={{ width: percent+'%' }}>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    header: state.header || {},
    entities: state.entities || {}
  }
}

export default connect(mapStateToProps, { setReadProgress })(HeaderProgress)
