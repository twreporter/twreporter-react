import globalEnv from '../../global-env'
import requestOrigins from '@twreporter/core/lib/constants/request-origins'
import twreporterRedux from '@twreporter/redux'
// lodash
import set from 'lodash/set'

const stateFields = twreporterRedux.reduxStateFields

const _ = {
  set,
}

/**
 *  This middleware inits redux store,
 *  and set it as `req[namespace].reduxStore`
 *  @param {string} namespace - namespace is used in `req` object to avoid from overwriting the existed field
 *  @param {Object} options
 *  @param {string} options.releaseBranch - release branch, it could be 'master', 'test', 'staging' or 'release'
 */
function initReduxStoreMiddleware(namespace, options) {
  return async function middleware(req, res, next) {
    try {
      const cookieList = req.get('cookie')
      // The redux actions will take the `origins` in the store, and use them as the origins of request url.
      // We set the initial origins for server side renedering. And we'll set them for client side rendering before we send the store to client.
      const initState = {
        [stateFields.origins]:
          requestOrigins.forServerSideRendering[options.releaseBranch],
      }
      const reduxStore = await twreporterRedux.createStore(
        initState,
        cookieList,
        globalEnv.isDevelopment
      )
      _.set(req, [namespace, 'reduxStore'], reduxStore)
      next()
    } catch (err) {
      next(err)
    }
  }
}

export default initReduxStoreMiddleware
