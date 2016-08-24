/* global __DEVELOPMENT__ */
'use strict'
import { google as storageConfig } from '../conf/storage'
import { SITE_META } from '../constants/index'

function replaceStorageUrlPrefix(url, isDev = __DEVELOPMENT__) {
  if (isDev) {
    return url
  }
  const { schema, hostname, bucket } = storageConfig
  let toBeReplaced = `${schema}://${hostname}/${bucket}`
  let toReplace = `${SITE_META.URL}storage`

  return url.replace(toBeReplaced, toReplace)
}

export { replaceStorageUrlPrefix }
