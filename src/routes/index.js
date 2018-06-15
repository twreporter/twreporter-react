// polyfill webpack require.ensure for node environment
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

import App from '../containers/App'
import IndexRoute from 'react-router/lib/IndexRoute'
import React from 'react'
import Route from 'react-router/lib/Route'
import Router from 'react-router/lib/Router'
import FallbackPage from '../containers/ServiceWorkerFallbackPage'
import browserHistory from 'react-router/lib/browserHistory'

function loadRoute(cb) {
  return (module) => {
    cb(null, module.default || module)
  }
}

const BOOKMAKRS_PAGE_PATH = 'bookmarks'

// The variable is declared for @twreporter/registration
export const ACTIVATE_PAGE_PATH = 'activate'

// NO_CACHE_PAGES are used by express server to set Cache-Control: no-store in the response header
export const NO_CACHE_PAGES = [ `/${ACTIVATE_PAGE_PATH}`, `/${BOOKMAKRS_PAGE_PATH}` ]

function errorLoading(err) {
  console.error('Err to load module:', err) //eslint-disable-line
}

/**
 * createRoutes
 * Code splitting and dynamic loading bundles by webpack require.ensure.
 * require.ensure is defined only in webpack, so the first line in this file is a polyfill for node environment.
 *
 * The following `import` in the `getComponent` function will be transpiled to `require.ensure` by babel
 * through `babel-plugin-system-import-transformer` plugin.
 *
 * @param {object} history default is react-router.browserHistory
 * @returns {object} React Router component
 */
export default function createRoutes(history = browserHistory) {
  return (
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute
          getComponent={(location, cb) => {
            import(
              /* webpackChunkName: "container-home" */
              '../containers/Home'
            ).then(loadRoute(cb)).catch(errorLoading)
          }}
        />
        <Route path="/sw-fallback-page" component={FallbackPage}/>
        <Route
          path="/topics/:slug"
          getComponent={(location, cb) => {
            import(
              /* webpackChunkName: "container-topic" */
              '../containers/TopicLandingPage'
            ).then(loadRoute(cb)).catch(errorLoading)
          }}
        />
        <Route
          path="topics"
          getComponent={(location, cb) => {
            import(
              /* webpackChunkName: "container-topics" */
              '../containers/Topics'
            ).then(loadRoute(cb)).catch(errorLoading)
          }}
        />
        <Route
          path="categories/:category"
          getComponent={(location, cb) => {
            import(
              /* webpackChunkName: "container-category" */
              '../containers/Category'
            ).then(loadRoute(cb)).catch(errorLoading)
          }}
        />
        <Route
          path="category/:category"
          getComponent={(location, cb) => {
            import(
              /* webpackChunkName: "container-category" */
              '../containers/Category'
            ).then(loadRoute(cb)).catch(errorLoading)
          }}
        />
        <Route
          path="tag/:tagId"
          getComponent={(location, cb) => {
            import(
              /* webpackChunkName: "container-tag" */
              '../containers/Tag'
            ).then(loadRoute(cb)).catch(errorLoading)
          }}
        />
        <Route
          path="photography"
          getComponent={(location, cb) => {
            import(
              /* webpackChunkName: "container-photography" */
              '../containers/Photography'
            ).then(loadRoute(cb)).catch(errorLoading)
          }}
        />
        <Route
          path="search"
          getComponent={(location, cb) => {
            import(
              /* webpackChunkName: "container-search" */
              '../containers/Search'
            ).then(loadRoute(cb)).catch(errorLoading)
          }}
        />
        <Route
          path="a/:slug"
          getComponent={(location, cb) => {
            import(
              /* webpackChunkName: "container-article" */
              '../containers/Article'
            ).then(loadRoute(cb)).catch(errorLoading)
          }} />
        <Route
          path="author/:authorId"
          getComponent={(location, cb) => {
            import(
              /* webpackChunkName: "container-author" */
              '../containers/Author'
            ).then(loadRoute(cb)).catch(errorLoading)
          }} />
        <Route
          path="authors"
          getComponent={(location, cb) => {
            import(
              /* webpackChunkName: "container-authors" */
              '../containers/AuthorsList'
            ).then(loadRoute(cb)).catch(errorLoading)
          }} />
        <Route
          path={ACTIVATE_PAGE_PATH}
          getComponent={(location, cb) => {
            import(
              /* webpackChunkName: "container-activation" */
              '../containers/Activation'
            ).then(loadRoute(cb)).catch(errorLoading)
          }}
        />
        <Route
          path="signin"
          getComponent={(location, cb) => {
            import(
              /* webpackChunkName: "container-singin" */
              '../containers/sign-in'
            ).then(loadRoute(cb)).catch(errorLoading)
          }}
        />
        <Route
          path="signup"
          getComponent={(location, cb) => {
            import(
              /* webpackChunkName: "container-singup" */
              '../containers/sign-up'
            ).then(loadRoute(cb)).catch(errorLoading)
          }}
        />
        <Route
          path="confirm"
          getComponent={(location, cb) => {
            import(
              /* webpackChunkName: "container-confirm" */
              '../containers/confirm-after-sign'
            ).then(loadRoute(cb)).catch(errorLoading)
          }}
        />
        <Route
          path="error/:errorType"
          getComponent={(location, cb) => {
            import(
              /* webpackChunkName: "error" */
              '@twreporter/react-components/lib/error'
            ).then(loadRoute(cb)).catch(errorLoading)
          }}
        />
        <Route
          path={`${BOOKMAKRS_PAGE_PATH}(/:pageNumber)`}
          redirectPath="/signin"
          getComponent={(location, cb) => {
            Promise.all([
              import(
                /* webpackChunkName: "registration" */
                '@twreporter/registration'
              ),
              import(
                /* webpackChunkName: "container-bookmarklist" */
                '../containers/BookmarkList'
              )
            ]).then(([ regModule, bookmarkModule ]) => {
              const AuthScreen = regModule.AuthenticationScreen
              cb(null, AuthScreen(bookmarkModule.default))
            }).catch(errorLoading)
          }}
        />
        <Route
          path="widgets-services"
          getComponent={(location, cb) => {
            import(
              /* webpackChunkName: "container-services" */
              '../containers/widgets/services'
            ).then(loadRoute(cb)).catch(errorLoading)
          }}
        />
        <Route
          path="widgets-bookmark-desktop"
          getComponent={(location, cb) => {
            import(
              /* webpackChunkName: "container-bookmarkdesktop" */
              '../containers/widgets/bookmark-desktop'
            ).then(loadRoute(cb)).catch(errorLoading)
          }}
        />
        <Route
          path="widgets-bookmark-mobile"
          getComponent={(location, cb) => {
            import(
              /* webpackChunkName: "container-bookmarkmobile" */
              '../containers/widgets/bookmark-mobile'
            ).then(loadRoute(cb)).catch(errorLoading)
          }}
        />
      </Route>
    </Router>
  )
}
