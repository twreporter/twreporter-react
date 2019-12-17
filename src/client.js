/* eslint no-console:0 */
/* global __DEVELOPMENT__ */
import 'babel-polyfill'
import { BrowserRouter, Route } from 'react-router-dom'
import { getGlobalEnv } from '@twreporter/core/lib/utils/global-env'
import App from './app'
import Loadable from 'react-loadable'
import React from 'react'
import ReactDOM from 'react-dom'
import ReactGA from 'react-ga'
import hashLinkScroll from './utils/hash-link-scroll'
import releaseBranchConsts from '@twreporter/core/lib/constants/release-branch.js'
import twreporterRedux from '@twreporter/redux'

const releaseBranch = getGlobalEnv().releaseBranch

let reduxState

if (window.__REDUX_STATE__) {
  reduxState = window.__REDUX_STATE__
}

function scrollToTopAndFirePageview() {
  if(window) {
    window.scrollTo(0, 0)
    // send Google Analytics Pageview event on route changed
    ReactGA.pageview(window.location.pathname)
  }

  return null
}

twreporterRedux.createStore(reduxState, '', __DEVELOPMENT__)
  .then((store) => {
    if (typeof window !== 'undefined') {
      // add Google Analytics
      ReactGA.initialize('UA-69336956-1')
      ReactGA.set({ page: window.location.pathname })
    }
    const jsx = (
      <BrowserRouter>
        <React.Fragment>
          <Route path="/" component={scrollToTopAndFirePageview} />
          <Route path="/" component={hashLinkScroll} />
          <App reduxStore={store} releaseBranch={releaseBranch}/>
        </React.Fragment>
      </BrowserRouter>
    )

    Loadable.preloadReady().then(() => {
      if (__DEVELOPMENT__) {
        ReactDOM.render(jsx, document.getElementById('root'))
        return
      }
      ReactDOM.hydrate(jsx, document.getElementById('root'))
    })
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

/* eslint-env browser */
'use strict'

if ('serviceWorker' in navigator && !__DEVELOPMENT__ && releaseBranch !== releaseBranchConsts.preview ) {
  // Delay registration until after the page has loaded, to ensure that our
  // precaching requests don't degrade the first visit experience.
  // See https://developers.google.com/web/fundamentals/instant-and-offline/service-worker/registration
  window.addEventListener('load', function () {
    // Your service-worker.js *must* be located at the top-level directory relative to your site.
    // It won't be able to control pages unless it's located at the same level or higher than them.
    // *Don't* register service worker file in, e.g., a scripts/ sub-directory!
    // See https://github.com/slightlyoff/ServiceWorker/issues/468
    navigator.serviceWorker.register('/sw.js').then(function (reg) {
      // updatefound is fired if service-worker.js changes.
      reg.onupdatefound = function () {
        // The updatefound event implies that reg.installing is set; see
        // https://w3c.github.io/ServiceWorker/#service-worker-registration-updatefound-event
        const installingWorker = reg.installing

        installingWorker.onstatechange = function () {
          switch (installingWorker.state) {
            case 'installed':
              if (navigator.serviceWorker.controller) {
                // At this point, the old content will have been purged and the fresh content will
                // have been added to the cache.
                // It's the perfect time to display a "New content is available; please refresh."
                // message in the page's interface.
                console.log('New or updated content is available.')
              } else {
                // At this point, everything has been precached.
                // It's the perfect time to display a "Content is cached for offline use." message.
                console.log('Content is now available offline!')
              }
              break

            case 'redundant':
              console.error('The installing service worker became redundant.')
              break
          }
        }
      }
    }).catch(function (e) {
      console.error('Error during service worker registration:', e)
    })
  })
}
