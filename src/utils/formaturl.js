/*global __SERVER__ */
'use strict'
import config from '../../server/config'
export function formatUrl(path) {
  if (__SERVER__) {
    // Prepend host and port of the API server to the path.
    return `${config.apiProtocol}://${config.apiHost}:${config.apiPort}/${path}`
  }
  // Prepend `/api` to relative URL, to proxy to API server.
  return '/api/' + path
}
