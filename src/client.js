import 'babel-polyfill'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import { match, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import createRoutes from './routes'
import DeviceProvider from './components/DeviceProvider'
import MobileDetect from 'mobile-detect'
import React from 'react'
import ReactDOM from 'react-dom'
import { setupTokenInLocalStorage, deletAuthInfoAction, authUserByTokenAction, keys } from 'twreporter-registration'

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

// Check if token existed in localStorage and expired
// following preocedure is for both accoutn and oAuth SignIn
// 7 = 7 days
store.dispatch(authUserByTokenAction(7, auth.authType))

const device = store.getState().device

const routes = createRoutes(history)

const { pathname, search, hash } = window.location
const location = `${pathname}${search}${hash}`

// calling `match` is simply for side effects of
// loading route/component code for the initial location
match({ routes, location }, () => {
  ReactDOM.render((
    <Provider store={store}>
      <DeviceProvider device={device}>
        { routes }
      </DeviceProvider>
    </Provider>
  ), document.getElementById('root'))
})

/* global __DEVTOOLS__ */
if (__DEVTOOLS__ && !window.__REDUX_DEVTOOLS_EXTENSION__) {
  match({ routes, location }, () => {
    const DevTools = require('./containers/DevTools').default
    ReactDOM.render((
      <Provider store={store}>
        <DeviceProvider device={device}>
          <div>
            { routes }
            <DevTools />
          </div>
        </DeviceProvider>
      </Provider>
    ), document.getElementById('root'))
  })
}
