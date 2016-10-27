'use strict'
import React from 'react'
import styles from './AuthorList.scss'

class LoadMore extends React.Component {
  constructor(props) {
    super(props)
    this._handleClick = this._handleClick.bind(this)
  }

  render() {
    if (this.props.isFinish) {
      return <div className={styles['loadMore']}>已經到最底了</div>
    } else {
      return <div onClick={this._handleClick} className={styles['loadMore']}>載入更多作者</div>
    }

  }

  _handleClick() {
    this.props.addLimit()
  }
}

export default LoadMore
