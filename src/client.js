import 'babel-polyfill'
import 'normalize.css'
import DeviceProvider from './components/DeviceProvider'
import MobileDetect from 'mobile-detect'
import React from 'react'
import ReactDOM from 'react-dom'
import ReactGA from 'react-ga'
import Router from 'react-router/lib/Router'
import browserHistory from 'react-router/lib/browserHistory'
import configureStore from './store/configureStore'
import createRoutes from './routes'
import match from 'react-router/lib/match'
import { Provider } from 'react-redux'
import { colors, layout, letterSpace, lineHeight, typography } from './themes/common-variables'
import { injectGlobal } from 'styled-components'
import { screen as mq } from './themes/screen'
import { setupTokenInLocalStorage, deletAuthInfoAction, authUserByTokenAction, keys, renewToken, getItem, scheduleRenewToken } from '@twreporter/registration'
import { syncHistoryWithStore } from 'react-router-redux'

// inject global styles into html
injectGlobal`
  html {
    font-size: ${typography.font.size.base};
    ::selection {
      background-color: ${colors.red.lightRed};
      color: $FFF;
    }
  }
  body {
    letter-spacing: ${letterSpace.generalLetterSpace};
    line-height: ${lineHeight.lineHeightMedium};
    font-family: "source-han-sans-traditional", "Noto Sans TC", "PingFang TC", "Apple LiGothic Medium", Roboto, "Microsoft JhengHei", "Lucida Grande", "Lucida Sans Unicode", sans-serif;
    abbr[title], abbr[data-original-title] {
      border-bottom: 0;
    }
    *, :before, :after {
      box-sizing: border-box;
    }

    a, a:link, a:visited {
      text-decoration: none;
    }

    img {
      vertical-align: middle;
    }

    .hidden {
      display: none !important;
    }

    .container {
      line-height: ${lineHeight.linHeightLarge};
    }

    .inner-max {
      ${mq.desktopAbove`
        max-width: ${layout.article.innerWidth};
      `}
    }

    .outer-max {
      ${mq.desktopAbove`
        max-width: ${layout.article.outerWidth};
      `}
    }

    .no-hover {
      border-bottom: 0 !important;
      &:after {
          display: none;
      }
      &:hover:after {
          width: 0;
          display: none;
      }
    }

    .text-justify {
      text-align: justify;
    }

    .text-center {
      text-align: center;
    }

    .center-block {
      display:block;
      margin-left:auto;
      margin-right:auto;
    }

    .visible-print {
      display: none;
    }

    figure, p {
      margin: 0;
    }

    @media print {
      .hidden-print {
        display: none !important;
      }
      .visible-print {
        display: block !important;
      }
      a[href]:after {
        content: '';
      }
    }
  }
`

let reduxState
if (window.__REDUX_STATE__) {
  reduxState = window.__REDUX_STATE__

  let md = new MobileDetect(window.navigator.userAgent)
  if (md.tablet()) {
    reduxState.device = 'tablet'
  } else if (md.mobile()) {
    reduxState.device = 'mobile'
  } else {
    reduxState.device = 'desktop'
  }
}

const store = configureStore(browserHistory, reduxState)

const history = syncHistoryWithStore(browserHistory, store)

// token can be stored in localStorage in two scenario
// 1. TWReporter account sign in
// 2. oAuth
// Acount: store auth info during signin action
// oAuth: cookie -> redux state -> localStorage -> delete authinfo in redux state
// The following procedure is only for oAuth
const { auth } = store.getState()
if(auth.authenticated && auth.authInfo && (auth.authType=== 'facebook' || auth.authType==='google')) {
  setupTokenInLocalStorage(auth.authInfo, keys.LOCALSTORAGE_KEY_AUTH)
  store.dispatch(deletAuthInfoAction())
}

// 1. Renew token when user brows our website
// 2. ScheduleRenewToken if user keep the tab open forever
const authInfoString = getItem(keys.LOCALSTORAGE_KEY_AUTH)
if(authInfoString) {
  const authObj = JSON.parse(authInfoString)
  const { authConfigure } = store.getState()
  const { apiUrl, renew } = authConfigure
  store.dispatch(renewToken(apiUrl, renew, authObj))
  scheduleRenewToken(
    6,
    () => {
      if (getItem(keys.LOCALSTORAGE_KEY_AUTH)) {
        store.dispatch(renewToken(apiUrl, renew, JSON.parse(getItem(keys.LOCALSTORAGE_KEY_AUTH))))
      }
    }
  )
}

// Check if token existed in localStorage and expired
// following preocedure is for both accoutn and oAuth SignIn
// 7 = 7 days
store.dispatch(authUserByTokenAction(7, auth.authType))

const device = store.getState().device

const routes = createRoutes(history)

if (typeof window !== 'undefined') {
  // add Google Analytics
  ReactGA.initialize('UA-69336956-1')
  ReactGA.set({ page: window.location.pathname })
}


function scrollAndFireTracking() {
  if(window) {
    window.scrollTo(0, 0)
    // send Google Analytics Pageview event on router changed
    ReactGA.pageview(window.location.pathname)
  }
}

// calling `match` is simply for side effects of
// loading route/component code for the initial location
// https://github.com/ReactTraining/react-router/blob/v3/docs/guides/ServerRendering.md#async-routes
match({ history, routes }, (error, redirectLocation, renderProps) => {
  ReactDOM.render((
    <Provider store={store}>
      <DeviceProvider device={device}>
        <Router {...renderProps} onUpdate={scrollAndFireTracking}/>
      </DeviceProvider>
    </Provider>
  ), document.getElementById('root'))
})

/* global __DEVTOOLS__ */
if (__DEVTOOLS__ && !window.__REDUX_DEVTOOLS_EXTENSION__) {
  match({ history, routes  }, (error, redirectLocation, renderProps) => {
    const DevTools = require('./containers/DevTools').default
    ReactDOM.render((
      <Provider store={store}>
        <DeviceProvider device={device}>
          <div>
            <Router {...renderProps}/>
            <DevTools />
          </div>
        </DeviceProvider>
      </Provider>
    ), document.getElementById('root'))
  })
}
