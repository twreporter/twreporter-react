/* global __DEVELOPMENT__ */

const storage = {
  google: {
    schema: 'https',
    hostname: 'storage.googleapis.com',
    bucket: 'twreporter-multimedia'
  }
}

const mainSite = {
  url: 'https://www.twreporter.org'
}

export function replaceStorageUrlPrefix(url = '', isDev = __DEVELOPMENT__) {
  if (isDev || typeof url !== 'string') {
    return url
  }
  const { schema, hostname, bucket } = storage.google
  const toReplace = mainSite.url
  const toBeReplaced = `${schema}://${hostname}/${bucket}`

  return url.replace(toBeReplaced, toReplace)
}
