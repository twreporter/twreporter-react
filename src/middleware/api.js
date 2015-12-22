/*eslint no-unused-vars: 1*/

import qs from 'qs'
import superAgent from 'superagent'
import Promise from 'bluebird'
import _ from 'lodash'

export const CALL_API = Symbol('CALL_API')

export default store => next => action => {
  if ( ! action[CALL_API] ) {
    return next(action)
  }
  let request = action[CALL_API]
  let { getState } = store
  let deferred = Promise.defer()
  // handle 401 and auth here
  let { method, url, types, params, tags } = request
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
    superAgent[method](url).timeout(500)
    .query(qs.stringify(params))
    .end(callback)
  } else {
    superAgent[method](url).timeout(500).send(params)
    .end(callback)
  }
  return deferred.promise
}
