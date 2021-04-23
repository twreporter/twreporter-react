/* eslint-env browser */
import 'babel-polyfill'
import { BrowserRouter, Route } from 'react-router-dom'
import App from './app'
import Loadable from 'react-loadable'
import React from 'react'
import ReactDOM from 'react-dom'
import ReactGA from 'react-ga'
import globalEnv from './global-env'
import hashLinkScroll from './utils/hash-link-scroll'
import loggerFactory from './logger'
import releaseBranchConsts from '@twreporter/core/lib/constants/release-branch'
import twreporterRedux from '@twreporter/redux'

const logger = loggerFactory.getLogger()
const releaseBranch = globalEnv.releaseBranch

let reduxState

if (window.__REDUX_STATE__) {
  reduxState = window.__REDUX_STATE__
}

/**
 *  Our application is a SPA (Single Page Application).
 *  In our app, we send requests to API webservices to get data
 *  if that data is not in the redux store.
 *  In other words, if data is already in the redux state, we won't send requests.
 *  There will be a problem of stale data.
 *  For example,
 *  1. end user goes to page A. App will fetch page A data and store it in redux state.
 *  2. end user goes to page B. App will fetch page B data and store it in redux state.
 *  3. end user goes to page A again. App won't fetch page A data since it already in
 *  the redux state.
 *
 *  If end users don't refresh the web page, the data will be always in the
 *  redux store. Therefore, end users might see the stale data
 *  even the data is already updated.
 *
 *  This function create a closure to store current timestamp + one day timestamp,
 *  and returns another function.
 *  If clients invoke that returned function, that function will reload the web page
 *  if needed.
 *
 *  @return {Function}
 */
function reloadPageIfNeeded() {
  const oneDayTs = 60 * 60 * 24 * 1000
  const nextTimeReloadTs = Date.now() + oneDayTs

  return () => {
    const now = Date.now()
    if (nextTimeReloadTs < now) {
      window.location.reload()
    }
    return null
  }
}

function scrollToTopAndFirePageview() {
  window.scrollTo(0, 0)
  // send Google Analytics Pageview event on route changed
  ReactGA.pageview(window.location.href)

  return null
}

const store = twreporterRedux.createStore(
  reduxState,
  '',
  globalEnv.isDevelopment
)

// add Google Analytics
ReactGA.initialize('UA-69336956-1')
ReactGA.set({ page: window.location.href })
const jsx = (
  <BrowserRouter>
    <React.Fragment>
      <Route path="/" component={reloadPageIfNeeded()} />
      <Route path="/" component={scrollToTopAndFirePageview} />
      <Route path="/" component={hashLinkScroll} />
      <App reduxStore={store} releaseBranch={releaseBranch} />
    </React.Fragment>
  </BrowserRouter>
)

Loadable.preloadReady().then(() => {
  if (globalEnv.isDevelopment) {
    ReactDOM.render(jsx, document.getElementById('root'))
    return
  }
  ReactDOM.hydrate(jsx, document.getElementById('root'))
})

/**
 * Copyright 2015 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

if (
  'serviceWorker' in navigator &&
  globalEnv.isProduction &&
  releaseBranch !== releaseBranchConsts.preview
) {
  // Delay registration until after the page has loaded, to ensure that our
  // precaching requests don't degrade the first visit experience.
  // See https://developers.google.com/web/fundamentals/instant-and-offline/service-worker/registration
  window.addEventListener('load', function() {
    // Your service-worker.js *must* be located at the top-level directory relative to your site.
    // It won't be able to control pages unless it's located at the same level or higher than them.
    // *Don't* register service worker file in, e.g., a scripts/ sub-directory!
    // See https://github.com/slightlyoff/ServiceWorker/issues/468
    navigator.serviceWorker
      .register('/sw.js')
      .then(function(reg) {
        // updatefound is fired if service-worker.js changes.
        reg.onupdatefound = function() {
          // The updatefound event implies that reg.installing is set; see
          // https://w3c.github.io/ServiceWorker/#service-worker-registration-updatefound-event
          const installingWorker = reg.installing

          installingWorker.onstatechange = function() {
            switch (installingWorker.state) {
              case 'installed':
                if (navigator.serviceWorker.controller) {
                  // At this point, the old content will have been purged and the fresh content will
                  // have been added to the cache.
                  // It's the perfect time to display a "New content is available; please refresh."
                  // message in the page's interface.
                  logger.info('New or updated content is available.')
                } else {
                  // At this point, everything has been precached.
                  // It's the perfect time to display a "Content is cached for offline use." message.
                  logger.info('Content is now available offline!')
                }
                break

              case 'redundant':
                logger.errorReport({
                  message: 'The installing service worker became redundant',
                })
                break
            }
          }
        }
      })
      .catch(function(e) {
        logger.errorReport({
          report: e,
          message: 'Error during service worker registration.',
        })
      })
  })
}
