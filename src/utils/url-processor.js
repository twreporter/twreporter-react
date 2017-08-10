/*global __SERVER__, __DEVELOPMENT__*/
'use strict'
import config from '../../server/config'
import { basePath, SITE_META, LINK_PREFIX, INTERACTIVE_ARTICLE_STYLE } from '../constants/index'
import { google as storageConfig } from '../conf/storage'

export function formatUrl(path) {
  if (__SERVER__) {
    // Prepend host and port of the API server to the path.
    return `${config.apiProtocol}://${config.apiHost}:${config.apiPort}/${path}`
  }
  // Prepend `/api` to relative URL, to proxy to API server.
  return '/api/' + path
}

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
