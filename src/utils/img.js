import { replaceGCSUrlOrigin } from '@twreporter/core/lib/utils/storage-url-processor'
import get from 'lodash/get'

const _ = {
  get
}

const assumedImageWidth = {
  desktop: 992,
  tablet: 768,
  mobile: 576
}

/**
 * Get srcset for img tag
 * @param {object} imgSet
 * @param {object} imgSet.desktop
 * @param {object} imgSet.tablet
 * @param {object} imgSet.mobile
 * @param {string} imgSet.desktop.url
 * @param {string} imgSet.tablet.url
 * @param {string} imgSet.mobile.url
 * @param {number} imgSet.desktop.width
 * @param {number} imgSet.tablet.width
 * @param {number} imgSet.mobile.width
 * @return {string} srcset
 */
export const getSrcSet = (imgSet) => {
  if (!imgSet || typeof imgSet !== 'object') {
    return ''
  }

  const mobileUrl = _.get(imgSet, 'mobile.url')
  const tabletUrl = _.get(imgSet, 'tablet.url')
  const desktopUrl = _.get(imgSet, 'desktop.url')

  let srcset = ''

  if (desktopUrl) {
    srcset += `${replaceGCSUrlOrigin(desktopUrl)} ${_.get(imgSet, 'desktop.width', assumedImageWidth.desktop)}w,`
  }

  if (tabletUrl) {
    srcset += `${replaceGCSUrlOrigin(tabletUrl)} ${_.get(imgSet, 'tablet.width', assumedImageWidth.tablet)}w,`
  }

  if (mobileUrl) {
    srcset += `${replaceGCSUrlOrigin(mobileUrl)} ${_.get(imgSet, 'mobile.width', assumedImageWidth.mobile)}w`
  }

  return srcset
}
