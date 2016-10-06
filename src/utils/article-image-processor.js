'use strict'
import { replaceStorageUrlPrefix } from './index'
import get from 'lodash/get'
import screenSize from '../constants/screen-size'

const defaultImage = '/asset/review.png'

export const getImageSrcSet = (article) => {
  let imgObj = get(article, 'heroImage') || get(article, 'ogImage')
  let desktopSrc = replaceStorageUrlPrefix(get(imgObj, 'image.resizedTargets.desktop.url'))
  let tabletSrc = replaceStorageUrlPrefix(get(imgObj, 'image.resizedTargets.tablet.url'))
  let mobileSrc = replaceStorageUrlPrefix(get(imgObj, 'image.resizedTargets.mobile.url'))
  return `${mobileSrc} ${screenSize.smallScreenMinWidth}w, ${tabletSrc} ${screenSize.mediumScreenMinWidth}w, ${desktopSrc} ${screenSize.largeScreenMinWidth}w`
}

export const getImageSrc = (article, device='desktop') => {
  let heroImage = get(article, 'heroImage')
  let ogImage = get(article, 'ogImage')
  return replaceStorageUrlPrefix(get(heroImage, `image.resizedTargets.${device}.url`) || get(ogImage, `image.resizedTargets.${device}.url`) || defaultImage)
}
