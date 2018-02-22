'use strict'
import { replaceStorageUrlPrefix } from './url'
import get from 'lodash/get'
import sz from '../constants/screen-size'

const _ = {
  get
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
  if (typeof imgSet !== 'object') {
    return ''
  }

  const mobileUrl = _.get(imgSet, 'mobile.url')
  const tabletUrl = _.get(imgSet, 'tablet.url')
  const desktopUrl = _.get(imgSet, 'desktop.url')

  let srcset = ''

  if (desktopUrl) {
    srcset += `${replaceStorageUrlPrefix(desktopUrl)} ${_.get(imgSet, 'desktop.width', sz.largeScreenMinWidth)}w`
  }

  if (tabletUrl) {
    srcset += `${replaceStorageUrlPrefix(tabletUrl)} ${_.get(imgSet, 'tablet.width', sz.mediumScreenMinWidth)}w,`
  }

  if (mobileUrl) {
    srcset += `${replaceStorageUrlPrefix(mobileUrl)} ${_.get(imgSet, 'mobile.width', sz.smallScreenMinWidth)}w,`
  }

  return srcset
}
