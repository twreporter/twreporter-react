'use strict'
import leftNav from '../../../../static/asset/left-arrow.svg'
import rightNav from '../../../../static/asset/right-arrow.svg'
import styles from './navigation.scss'
import React from 'react'

const navigation = (props) => {

  const { onSlideLeft, onSlideRight } = props

  return (
    <span key="navigation">
      <img
        className={styles['ss-left-nav']}
        onTouchStart={onSlideLeft}
        onClick={onSlideLeft}
        src={leftNav}
      />

      <img
        className={styles['ss-right-nav']}
        onTouchStart={onSlideRight}
        onClick={onSlideRight}
        src={rightNav}
      />
    </span>
  )
}

export default navigation
