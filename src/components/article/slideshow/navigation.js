'use strict'
import classNames from 'classnames'
import DisabledLeftNav from '../../../../static/asset/disabled-left-arrow.svg'
import DisabledRightNav from '../../../../static/asset/disabled-right-arrow.svg'
import LeftNav from '../../../../static/asset/left-arrow.svg'
import RightNav from '../../../../static/asset/right-arrow.svg'
import styles from './navigation.scss'
import React from 'react'

const navigation = (props) => {

  const { onSlideLeft, onSlideRight, isLeftNavDisabled, isRightNavDisabled } = props

  return (
    <span key="navigation">
      {
        isLeftNavDisabled ?
          <DisabledLeftNav
            className={classNames(styles['ss-left-nav'], styles['disabled'])}
            onClick={onSlideLeft}
          /> :
          <LeftNav
            className={styles['ss-left-nav']}
            onClick={onSlideLeft}
          />
      }
      {
        isRightNavDisabled ?
          <DisabledRightNav
            className={classNames(styles['ss-right-nav'], styles['disabled'])}
            onClick={onSlideRight}
          /> :
          <RightNav
            className={styles['ss-right-nav']}
            onClick={onSlideRight}
          />
      }
    </span>
  )
}

export default navigation
