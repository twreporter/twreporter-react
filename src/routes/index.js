// polyfill webpack require.ensure for node environment
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

import App from '../containers/App'
import React from 'react'
import ReactGA from 'react-ga'
import { Route, Router, browserHistory } from 'react-router'

if (typeof window !== 'undefined') {
  // add Google Analytics
  ReactGA.initialize('UA-69336956-1')
  ReactGA.set({ page: window.location.pathname })
}

// The variable host is declared for @twreporter/registration
export const ACTIVATE_PAGE_PATH = 'activate'

function scrollAndFireTracking() {
  if(window) {
    window.scrollTo(0, 0)
    // send Google Analytics Pageview event on router changed
    ReactGA.pageview(window.location.pathname)
  }
}

/* Code splitting and dynamic loading bundles by webpack require.ensure.
 * require.ensure is defined only in webpack, so the first line is a polyfill for node environment.
 * Due to webpack limitation, the following code is kind of duplicated.
 * Currently, I have no way to reduce the codes.
 * If you know how to reduce the duplicated codes, PR is welcome.
 */
export default function (history = browserHistory) {
  return (
    <Router history={history} onUpdate={scrollAndFireTracking} >
      <Route
        path="/topics/:slug"
        getComponent={(nextStateWithLocation, cb) => {
          require.ensure([], (require) => {
            const module = require('../containers/TopicLandingPage')
            cb(null, module.default || module)
          })
        }}
      />
      <Route
        path="/"
        getComponent={(nextStateWithLocation, cb) => {
          require.ensure([], (require) => {
            const module = require('../containers/Home')
            cb(null, module.default || module)
          })
        }}
      />
      <Route path="/" component={App}>
        <Route
          path="topics"
          getComponent={(nextStateWithLocation, cb) => {
            require.ensure([], (require) => {
              const module = require('../containers/Topics')
              cb(null, module.default || module)
            })
          }}
        />
        <Route
          path="category/:category"
          getComponent={(nextStateWithLocation, cb) => {
            require.ensure([], (require) => {
              const module = require('../containers/Category')
              cb(null, module.default || module)
            })
          }}
        />
        <Route
          path="categories/:category"
          getComponent={(nextStateWithLocation, cb) => {
            require.ensure([], (require) => {
              const module = require('../containers/Category')
              cb(null, module.default || module)
            })
          }}
        />
        <Route
          path="topic/:topicId"
          getComponent={(nextStateWithLocation, cb) => {
            require.ensure([], (require) => {
              const module = require('../containers/Topic')
              cb(null, module.default || module)
            })
          }}
        />
        <Route
          path="tag/:tagId"
          getComponent={(nextStateWithLocation, cb) => {
            require.ensure([], (require) => {
              const module = require('../containers/Tag')
              cb(null, module.default || module)
            })
          }}
        />
        <Route
          path="photography"
          getComponent={(nextStateWithLocation, cb) => {
            require.ensure([], (require) => {
              const module = require('../containers/Photography')
              cb(null, module.default || module)
            })
          }}
        />
        <Route
          path="search"
          getComponent={(nextStateWithLocation, cb) => {
            require.ensure([], (require) => {
              const module = require('../containers/Search')
              cb(null, module.default || module)
            })
          }}
        />
        <Route
          path="a/:slug"
          getComponent={(nextStateWithLocation, cb) => {
            require.ensure([], (require) => {
              const module = require('../containers/Article')
              cb(null, module.default || module)
            })
          }} />
        <Route
          path="author/:authorId"
          getComponent={(nextStateWithLocation, cb) => {
            require.ensure([], (require) => {
              const module = require('../containers/Author')
              cb(null, module.default || module)
            })
          }}
        />
        <Route
          path="authors"
          getComponent={(nextStateWithLocation, cb) => {
            require.ensure([], (require) => {
              const module = require('../containers/AuthorsList')
              cb(null, module.default || module)
            })
          }}
        />
        <Route
          path={ACTIVATE_PAGE_PATH}
          getComponent={(nextStateWithLocation, cb) => {
            require.ensure([], (require) => {
              const module = require('../containers/Activation')
              cb(null, module.default || module)
            })
          }}
        />
        <Route
          path="signin"
          getComponent={(nextStateWithLocation, cb) => {
            require.ensure([], (require) => {
              const module = require('../containers/sign-in')
              cb(null, module.default || module)
            })
          }}
        />
        <Route
          path="signup"
          getComponent={(nextStateWithLocation, cb) => {
            require.ensure([], (require) => {
              const module = require('../containers/sign-up')
              cb(null, module.default || module)
            })
          }}
        />
        <Route
          path="confirm"
          getComponent={(nextStateWithLocation, cb) => {
            require.ensure([], (require) => {
              const module = require('../containers/confirm-after-sign')
              cb(null, module.default || module)
            })
          }}
        />
        <Route
          path="bookmarks(/:pageNumber)"
          redirectPath="/signin"
          getComponent={(nextStateWithLocation, cb) => {
            require.ensure([], (require) => {
              const subModule = require('../containers/BookmarkList')
              const AuthScreen = require('@twreporter/registration').AuthenticationScreen
              cb(null, AuthScreen(subModule.default))
            })
          }}
        />
      </Route>
    </Router>
  )
}
