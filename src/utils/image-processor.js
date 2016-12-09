'use strict'
import { replaceStorageUrlPrefix } from './index'
import get from 'lodash/get'
import screenSize from '../constants/screen-size'

const defaultImage = '/asset/review.png'

/**
 * Get image set as imgSrc attribute of <img> tag
 * @param {object} article - Article object
 * @param {object} article.heroImage
 * @param {object} article.heroImage.image
 * @param {object} article.heroImage.image.resizedTargets
 * @return {string} srcSet
 */
export const getArticleImageSrcSet = (article) => {
  let imgObj = get(article, 'heroImage.image.resizedTargets') || get(article, 'ogImage.image.resizedTargets')
  return getImageSrcSet(imgObj)
}

/**
 * Get image set as imgSrc attribute of <img> tag
 * @param {object} imgObj - Image object
 * @param {object} imgObj.desktop
 * @param {object} imgObj.tablet
 * @param {object} imgObj.mobile
 * @param {string} imgObj.desktop.url
 * @param {string} imgObj.tablet.url
 * @param {string} imgObj.mobile.url
 * @return {string} srcSet
 */
export const getImageSrcSet = (imgObj) => {
  let desktopSrc = replaceStorageUrlPrefix(get(imgObj, 'desktop.url'))
  let tabletSrc = replaceStorageUrlPrefix(get(imgObj, 'tablet.url'))
  let mobileSrc = replaceStorageUrlPrefix(get(imgObj, 'mobile.url'))
  return `${mobileSrc} ${screenSize.smallScreenMinWidth}w, ${tabletSrc} ${screenSize.mediumScreenMinWidth}w, ${desktopSrc} ${screenSize.largeScreenMinWidth}w`
}

export const getArticlelImageSrc = (article, device='desktop') => {
  let heroImage = get(article, 'heroImage')
  let ogImage = get(article, 'ogImage')
  return replaceStorageUrlPrefix(get(heroImage, `image.resizedTargets.${device}.url`) || get(ogImage, `image.resizedTargets.${device}.url`) || defaultImage)
}
