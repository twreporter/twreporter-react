'use strict'
import ArrowDownIcon from '../../../static/asset/arrow-down.svg'
import PropTypes from 'prop-types'
import React from 'react'
import smoothScroll from 'smoothscroll'
import stylesBottom from './BannerBottom.scss'
import stylesBottomLeft from './BannerBottomLeft.scss'
import stylesCenter from './BannerCenter.scss'
import { TOPIC_LAST_UPDATED } from '../../constants/index'
import { addStylesToPropsDecorator } from '../shared/ComponentDecorators'
import { date2yyyymmdd } from '../../utils/date'

/**
 * Add tail space when head is a fullwidth bracket for visually centering
 *
 * @param {string} text
 * @returns {string}
 */
function addTailSpaceIfHeadIsFullwidthBracket(text) {
  if (typeof text === 'string') {
    const leftBrackets = [ '（', '【', '〔', '《', '〈', '｛', '『', '「' ]
    for (let i=0, length=leftBrackets.length; i<length; i++) {
      if (typeof text === 'string' && text.startsWith(leftBrackets[i])) {
        return (text + '  ')
      }
    }
  }
  return text
}

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
        <ArrowDownIcon />
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

export default class BannerFactory {
  constructor() {
    this.CenterBanner = addStylesToPropsDecorator(Banner, stylesCenter)
    this.BottomLeftBanner = addStylesToPropsDecorator(Banner, stylesBottomLeft)
    this.BottomBanner = addStylesToPropsDecorator(Banner, stylesBottom)
  }
  buildWithTheme(themeName) {
    switch (themeName) {
      case 'center':
        return this.CenterBanner
      case 'bottom-left':
        return this.BottomLeftBanner
      case 'bottom':
        return this.BottomBanner
      default:
        return this.CenterBanner
    }
  }
}
