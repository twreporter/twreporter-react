/* global __DEVELOPMENT__ */
import set from 'lodash/set'
import twreporterRedux from '@twreporter/redux'

const _ = {
  set
}

/**
 *  This middleware inits redux store,
 *  and set it as `req[namespace].reduxStore`
 *  @param {string} namespace - namespace is used in `req` object to avoid from overwriting the existed field
 */
function initReduxStoreMiddleware(namespace) {
  return async function middleware(req, res, next) {
    try {
      const cookieList = req.get('cookie')
      const reduxStore = await twreporterRedux.createStore({}, cookieList, __DEVELOPMENT__)
      _.set(req, [ namespace, 'reduxStore' ], reduxStore)
      next()
    } catch(err) {
      next(err)
    }
  }
}

export default initReduxStoreMiddleware
