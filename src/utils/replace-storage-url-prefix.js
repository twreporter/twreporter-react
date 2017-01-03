/*global __DEVELOPMENT__*/
'use strict'
import { google as storageConfig } from '../conf/storage'
import { SITE_META } from '../constants/index'

function replaceStorageUrlPrefix(url='', isDev = __DEVELOPMENT__) {
  if (isDev || typeof url !== 'string') {
    return url
  }
  const { schema, hostname, bucket } = storageConfig
  let toBeReplaced = `${schema}://${hostname}/${bucket}`
  let toReplace = `${SITE_META.URL_NO_SLASH}`

  return url.replace(toBeReplaced, toReplace)
}

export { replaceStorageUrlPrefix }
