/* eslint node/no-deprecated-api: 1 */
import get from 'lodash/get'
import getRoutes from '../../routes'
import loggerFactory from '../../logger'
import statusCodeConst from '../../constants/status-code'
import url from 'url'
import { matchPath } from 'react-router-dom'

const _ = {
  get,
}

const logger = loggerFactory.getLogger()

/**
 *  This middleware prepare data according to routes
 *  and store the results into redux store
 *  @param {string} namespace - namespace is used in `req` object to avoid from overwriting the existed field
 *
 */
function dataLoaderMiddleware(namespace) {
  return function middleware(req, res, next) {
    const store = _.get(req, [namespace, 'reduxStore'])
    if (!store) {
      next(new Error(`req.${namespace}.reduxStore is not existed`))
      return
    }

    const routes = getRoutes()
    const dataLoadingPromises = []

    // Use `some` to imitate `<Switch>` behavior of selecting only the first to match
    routes.some(route => {
      const match = matchPath(req.path, route)
      if (match && route.loadData) {
        const { hash, pathname, search } = new url.URL(req.originalUrl)
        dataLoadingPromises.push(
          route.loadData({
            store,
            match,
            location: {
              hash,
              pathname,
              search,
            },
          })
        )
      }
      return match
    })

    Promise.all(dataLoadingPromises)
      .then(() => {
        next()
      })
      .catch(failAction => {
        const error = _.get(failAction, 'payload.error')
        const errStatusCode =
          _.get(error, 'statusCode') || _.get(error, 'status')

        switch (errStatusCode) {
          case statusCodeConst.notFound: {
            return res.redirect(`/error/${errStatusCode}`)
          }
          default: {
            logger.errorReport({
              report: error,
              message: 'Error was caught by data-loader express middleware.',
            })
            return res.redirect(`/error/${errStatusCode}`)
          }
        }
      })
  }
}

export default dataLoaderMiddleware
