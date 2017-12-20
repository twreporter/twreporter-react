// polyfill webpack require.ensure for node environment
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

import App from '../containers/App'
import IndexRoute from 'react-router/lib/IndexRoute'
import React from 'react'
import Route from 'react-router/lib/Route'
import Router from 'react-router/lib/Router'
import browserHistory from 'react-router/lib/browserHistory'

function loadRoute(cb) {
  return (module) => {
    cb(null, module.default || module)
  }
}

const BOOKMAKRS_PAGE_PATH = 'bookmarks'

// The variable is declared for @twreporter/registration
export const ACTIVATE_PAGE_PATH = 'activate'
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
            import('../containers/Home').then(loadRoute(cb)).catch(errorLoading)
          }}
        />
        <Route
          path="/topics/:slug"
          getComponent={(location, cb) => {
            import('../containers/TopicLandingPage').then(loadRoute(cb)).catch(errorLoading)
          }}
        />
        <Route
          path="topics"
          getComponent={(location, cb) => {
            import('../containers/Topics').then(loadRoute(cb)).catch(errorLoading)
          }}
        />
        <Route
          path="categories/:category"
          getComponent={(location, cb) => {
            import('../containers/Category').then(loadRoute(cb)).catch(errorLoading)
          }}
        />
        <Route
          path="category/:category"
          getComponent={(location, cb) => {
            import('../containers/Category').then(loadRoute(cb)).catch(errorLoading)
          }}
        />
        <Route
          path="topic/:topicId"
          getComponent={(location, cb) => {
            import('../containers/Topic').then(loadRoute(cb)).catch(errorLoading)
          }}
        />
        <Route
          path="tag/:tagId"
          getComponent={(location, cb) => {
            import('../containers/Tag').then(loadRoute(cb)).catch(errorLoading)
          }}
        />
        <Route
          path="photography"
          getComponent={(location, cb) => {
            import('../containers/Photography').then(loadRoute(cb)).catch(errorLoading)
          }}
        />
        <Route
          path="search"
          getComponent={(location, cb) => {
            import('../containers/Search').then(loadRoute(cb)).catch(errorLoading)
          }}
        />
        <Route
          path="a/:slug"
          getComponent={(location, cb) => {
            import('../containers/Article').then(loadRoute(cb)).catch(errorLoading)
          }} />
        <Route
          path="author/:authorId"
          getComponent={(location, cb) => {
            import('../containers/Author').then(loadRoute(cb)).catch(errorLoading)
          }} />
        <Route
          path="authors"
          getComponent={(location, cb) => {
            import('../containers/AuthorsList').then(loadRoute(cb)).catch(errorLoading)
          }} />
        <Route
          path={ACTIVATE_PAGE_PATH}
          getComponent={(location, cb) => {
            import('../containers/Activation').then(loadRoute(cb)).catch(errorLoading)
          }}
        />
        <Route
          path="signin"
          getComponent={(location, cb) => {
            import('../containers/sign-in').then(loadRoute(cb)).catch(errorLoading)
          }}
        />
        <Route
          path="signup"
          getComponent={(location, cb) => {
            import('../containers/sign-up').then(loadRoute(cb)).catch(errorLoading)
          }}
        />
        <Route
          path="confirm"
          getComponent={(location, cb) => {
            import('../containers/confirm-after-sign').then(loadRoute(cb)).catch(errorLoading)
          }}
        />
        <Route
          path="error/:errorType"
          getComponent={(location, cb) => {
            import('@twreporter/react-components/lib/error').then(loadRoute(cb)).catch(errorLoading)
          }}
        />
        <Route
          path={`${BOOKMAKRS_PAGE_PATH}(/:pageNumber)`}
          redirectPath="/signin"
          getComponent={(location, cb) => {
            Promise.all([
              import('@twreporter/registration'),
              import('../containers/BookmarkList')
            ]).then(([ regModule, bookmarkModule ]) => {
              const AuthScreen = regModule.AuthenticationScreen
              cb(null, AuthScreen(bookmarkModule.default))
            }).catch(errorLoading)
          }}
        />
      </Route>
    </Router>
  )
}
