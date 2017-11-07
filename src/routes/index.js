// polyfill webpack require.ensure for node environment
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

import App from '../containers/App'
import React from 'react'
import { Route, Router, browserHistory } from 'react-router'

function loadRoute(cb) {
  return (module) => {
    cb(null, module.default || module)
  }
}

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
      <Route
        path="/topics/:slug"
        getComponent={(location, cb) => {
          import('../containers/TopicLandingPage').then(loadRoute(cb)).catch(errorLoading)
        }}
      />
      <Route
        path="/"
        getComponent={(location, cb) => {
          import('../containers/Home').then(loadRoute(cb)).catch(errorLoading)
        }}
      />
      <Route path="/" component={App}>
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
        />
        <Route
          path="authors"
          getComponent={(location, cb) => {
            import('../containers/AuthorsList').then(loadRoute(cb)).catch(errorLoading)
          }} />
      </Route>
    </Router>
  )
}
