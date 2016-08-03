import React, { Component } from 'react'
import styles from './TopicPopup.scss'
import classNames from 'classnames'
import closeIcon from '../../../static/asset/icon-navbar-close.svg'

export default class TopicPopup extends Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    const { isOpen, onTopicBtnClick } = this.props

    let displayClass = isOpen ? styles.open : styles.close

    return (
      <div className={classNames(styles.popup, displayClass)}>
        <div className={styles.closeBtn} onClick={onTopicBtnClick}>
          <img src={closeIcon} />
        </div>
      </div>
    )
  }
}
