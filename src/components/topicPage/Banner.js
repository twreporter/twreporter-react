'use strict'
/*
  If you want to add a new theme to banner, it's NO need to modify this component.

  You just need to make sure that the selector (in the css you add) has
  the postfix which corresponds with the theme name in API.
  
  Ex:
  If (bannerTheme === 'bottom-left'),
  the selector of `title` in Banner.scss should be '.title-bottom-left'
*/
import React, { PropTypes } from 'react'
import smoothScroll from 'smoothscroll'
import partial from 'lodash/partial'
import styles from './Banner.scss'
import arrowDownIcon from '../../../static/asset/arrow-down.svg'
import { date2yyyymmdd, addTailSpaceIfHeadIsFullwidthBracket, addClassNameWithThemePostfix } from '../../utils/index'

const _ = {
  partial
}

const Banner = (props) => {
  const { headline, title, subtitle, publishedDate, bannerTheme } = props
  const _handleScroll = function (e) {
    e.preventDefault()
    if (typeof window !== 'object') return
    return smoothScroll(window.innerHeight)
  }
  /* _cn - className */
  const _addCnBannerthemepostfix = _.partial(addClassNameWithThemePostfix, styles, bannerTheme)
  const _cnBannerContainer = _addCnBannerthemepostfix('banner-container')
  const _cnInfosFlexContainer= _addCnBannerthemepostfix('infos-flex-container')
  const _cnHeadline = _addCnBannerthemepostfix('headline')
  const _cnTitle = _addCnBannerthemepostfix('title')
  const _cnSubtitle = _addCnBannerthemepostfix('subtitle')
  const _cnDash = _addCnBannerthemepostfix('dash')
  const _cnPublishedDate = _addCnBannerthemepostfix('published-date')
  const _cnArrowDownIcon = _addCnBannerthemepostfix('arrow-down-icon')
  return (
    <div className={_cnBannerContainer}>
      <div className={_cnInfosFlexContainer} >
        {!headline ? null : <div className={_cnHeadline} >{addTailSpaceIfHeadIsFullwidthBracket(headline)}</div>}
        <h1 className={_cnTitle} >{title}</h1>
        {!subtitle ? null : <h2 className={_cnSubtitle} >{subtitle}</h2>}
        <div className={_cnDash} ></div>
        {!publishedDate ? null : <div className={_cnPublishedDate} >{date2yyyymmdd(publishedDate, '.')+' 最後更新'}</div>}
      </div>
      <img className={_cnArrowDownIcon} src={arrowDownIcon} onClick={_handleScroll} role="presentation" />
    </div>
  )
}

Banner.propTypes = {
  headline: PropTypes.string,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  publishedDate: PropTypes.string.isRequired,
  bannerTheme: PropTypes.string.isRequired,
  descriptionNode: PropTypes.element
}

export default Banner
