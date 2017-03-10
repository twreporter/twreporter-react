'use strict'

import React, { PropTypes } from 'react'
import smoothScroll from 'smoothscroll'
import stylesCenter from './BannerCenter.scss'
import stylesBottomLeft from './BannerBottomLeft.scss'
import stylesBottom from './BannerBottom.scss'
import arrowDownIcon from '../../../static/asset/arrow-down.svg'
import { date2yyyymmdd, addTailSpaceIfHeadIsFullwidthBracket, addStylesToProps, partialApply } from '../../utils/index'
import { TOPIC_LAST_UPDATED } from '../../constants/index'

const Banner = (props) => {
  const { headline, title, subtitle, publishedDate, styles } = props
  const _handleScroll = function (e) {
    e.preventDefault()
    if (typeof window !== 'object') return
    return smoothScroll(window.innerHeight)
  }
  return (
    <div className={styles['banner-container']}>
      <div className={styles['infos-flex-container']} >
        {!headline ? null : <div className={styles['headline']} >{addTailSpaceIfHeadIsFullwidthBracket(headline)}</div>}
        <h1 className={styles['title']} >{title}</h1>
        {!subtitle ? null : <h2 className={styles['subtitle']} >{subtitle}</h2>}
        <div className={styles['dash']} ></div>
        {!publishedDate ? null : <div className={styles['published-date']} >{date2yyyymmdd(publishedDate, '.')+' '+TOPIC_LAST_UPDATED}</div>}
      </div>
      <div className={styles['arrow-down-icon-wrapper']} onClick={_handleScroll} >
        <img src={arrowDownIcon} role="presentation" />
      </div>
    </div>
  )
}

Banner.propTypes = {
  styles: PropTypes.object.isRequired,
  infosData: PropTypes.shape({
    headline: PropTypes.string,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    publishedDate: PropTypes.string.isRequired
  })
}

const addStylesToBanner = partialApply(addStylesToProps, Banner)

export default class BannerFactory {
  buildWithTheme(themeName) {
    switch (themeName) {
      case 'center':
        return addStylesToBanner(stylesCenter)
      case 'bottom-left':
        return addStylesToBanner(stylesBottomLeft)
      case 'bottom':
        return addStylesToBanner(stylesBottom)
      default:
        return addStylesToBanner(stylesCenter)
    }
  }
}
