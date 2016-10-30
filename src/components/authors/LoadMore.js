'use strict'
import React from 'react'
import styles from './AuthorList.scss'

class LoadMore extends React.Component {
  constructor(props) {
    super(props)
    this._handleClick = this._handleClick.bind(this)
  }
  render() {
    const isFinish = this.props.isFinish
    if (this.props.displayCount<1) {
      return <div></div>
    }
    if (isFinish) {
      return <div className={styles['is-finish']} >已經到最底了</div>
    } else {
      return <div className={styles['load-more']} onClick={this._handleClick}>載入更多作者</div>
    }
  }

  _handleClick() {
    this.props.addLimit()
  }
}

export default LoadMore
