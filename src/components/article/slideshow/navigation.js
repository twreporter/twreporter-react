'use strict'
import classNames from 'classnames'
import disabledLeftNav from '../../../../static/asset/disabled-left-arrow.svg'
import disabledRightNav from '../../../../static/asset/disabled-right-arrow.svg'
import leftNav from '../../../../static/asset/left-arrow.svg'
import rightNav from '../../../../static/asset/right-arrow.svg'
import styles from './navigation.scss'
import React from 'react'

const navigation = (props) => {

  const { onSlideLeft, onSlideRight, isLeftNavDisabled, isRightNavDisabled } = props

  return (
    <span key="navigation">
      <img
        className={classNames(styles['ss-left-nav'], { [styles['disabled']]: isLeftNavDisabled })}
        onTouchStart={onSlideLeft}
        onClick={onSlideLeft}
        src={ isLeftNavDisabled ? disabledLeftNav : leftNav }
      />

      <img
        className={classNames(styles['ss-right-nav'], { [styles['disabled']]: isRightNavDisabled })}
        onTouchStart={onSlideRight}
        onClick={onSlideRight}
        src={ isRightNavDisabled ? disabledRightNav : rightNav }
      />
    </span>
  )
}

export default navigation
