/* eslint no-unused-vars:0 */

/*
  If you want to add a new theme to banner, it's NO need to modify this component.

  You just need to make sure that the selector (in the css you add) has
  the postfix which corresponds with the theme name in API.
  
  Ex:
  If (bannerTheme === 'bottom-left'),
  the selector of `title` in Banner.scss should be '.title-bottom-left'
*/

import React, { PropTypes } from 'react'
import classNames from 'classnames'
import styles from './Banner.scss'
import startsWith from 'lodash/startsWith'
import arrowDownIcon from '../../../static/asset/arrow-down.svg'
import { date2yyyymmdd } from '../../utils/index'


const Banner = (props) => {
  const { headline, title, subtitle, publishedDate, bannerTheme } = props
  const combineClassWithTheme = (className) => classNames(styles[className], bannerTheme?styles[bannerTheme+'-'+className]:false)
  const addSpaceIfStartWithFullwidthBracket = (text) => {
    if (typeof text === 'string') {
      const leftBrackets = [ '（', '【', '〔', '《', '〈', '｛', '『', '「' ]
      for (let i=0, length=leftBrackets.length; i<length; i++) {
        if (startsWith(text, leftBrackets[i])) {
          return (text + '  ')
        }
      }
    }
    return text
  }
  const _cnBannerContainer = combineClassWithTheme('banner-container')
  const _cnInfosFlexContainer= combineClassWithTheme('infos-flex-container')
  const _cnHeadline = combineClassWithTheme('headline')
  const _cnTitle = combineClassWithTheme('title')
  const _cnSubtitle = combineClassWithTheme('subtitle')
  const _cnDash = combineClassWithTheme('dash')
  const _cnPublishedDate = combineClassWithTheme('published-date')
  const _cnArrowDownIcon = combineClassWithTheme('arrow-down-icon')
  return (
    <div className={_cnBannerContainer}>
      <div className={_cnInfosFlexContainer} >
        <div className={_cnHeadline} >{addSpaceIfStartWithFullwidthBracket(headline)}</div>
        <h1 className={_cnTitle} >{title}</h1>
        <h2 className={_cnSubtitle} >{subtitle}</h2>
        <div className={_cnDash} ></div>
        <div className={_cnPublishedDate} >{date2yyyymmdd(publishedDate, '.')+' 最後更新'}</div>
      </div>
      <img className={_cnArrowDownIcon} src={arrowDownIcon} role="presentation" />
    </div>
  )
}

Banner.propTypes = {
  headline: PropTypes.string,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  publishedDate: PropTypes.string.isRequired,
  bannerTheme: PropTypes.string.isRequired
}

export default Banner
