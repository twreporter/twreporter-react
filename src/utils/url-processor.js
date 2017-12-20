/*global __DEVELOPMENT__*/
'use strict'
import { basePath, SITE_META, LINK_PREFIX, INTERACTIVE_ARTICLE_STYLE } from '../constants/index'
import { google as storageConfig } from '../conf/storage'


export function getAbsPath(pathname='', search='') {
  return basePath + pathname + search
}

export function replaceStorageUrlPrefix(url='', isDev = __DEVELOPMENT__) {
  if (isDev || typeof url !== 'string') {
    return url
  }
  const { schema, hostname, bucket } = storageConfig
  let toBeReplaced = `${schema}://${hostname}/${bucket}`
  let toReplace = `${SITE_META.URL_NO_SLASH}`

  return url.replace(toBeReplaced, toReplace)
}

export const formatPostLinkTo = (targetPostSlug = '', targetPostStyle = '') => (
  (targetPostStyle === INTERACTIVE_ARTICLE_STYLE) ? `${LINK_PREFIX.INTERACTIVE_ARTICLE}${targetPostSlug}` : `${LINK_PREFIX.ARTICLE}${targetPostSlug}`
)

export const formatPostLinkTarget = (targetPostStyle = '') => (
  targetPostStyle === INTERACTIVE_ARTICLE_STYLE ? '_blank' : null
)
