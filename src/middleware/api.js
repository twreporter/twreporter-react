/*eslint no-unused-vars: 1*/
/*global __SERVER__ */

import config from '../../server/config'
import qs from 'qs'
import superAgent from 'superagent'
import Promise from 'bluebird'
import _ from 'lodash'

export const CALL_API = Symbol('CALL_API')

function formatUrl(path) {
  if (__SERVER__) {
    // Prepend host and port of the API server to the path.
    return 'http://' + config.apiHost + ':' + config.apiPort + path
  }
  // Prepend `/api` to relative URL, to proxy to API server.
  return '/api' + path
}

export default store => next => action => {
  if ( ! action[CALL_API] ) {
    return next(action)
  }
  let request = action[CALL_API]
  let { getState } = store
  let deferred = Promise.defer()
  // handle 401 and auth here
  let { method, path, types, params, tags } = request
  const [ successType, failureType ] = types

  const callback = (err, res) => {
    if ( res && res.text ) {
      if (res.ok) {
        next({
          type: successType,
          response: res,
          tags: tags || []
        })
        if (_.isFunction(request.afterSuccess)) {
          request.afterSuccess({ getState })
        }
      }
    } else {
      next({
        type: failureType,
        response: {},
        tags: tags || []
      })
    }
    deferred.resolve()
  }

  if (method === 'get') {
    superAgent[method](formatUrl(path)).timeout(500)
    .query(qs.stringify(params))
    .end(callback)
  } else {
    superAgent[method](formatUrl(path)).timeout(500).send(params)
    .end(callback)
  }
  return deferred.promise
}
