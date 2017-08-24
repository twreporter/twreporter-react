import 'babel-polyfill'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import createRoutes from './routes'
import DeviceProvider from './components/DeviceProvider'
import MobileDetect from 'mobile-detect'
import React from 'react'
import ReactDOM from 'react-dom'
import { setupTokenInLocalStorage, deletAuthInfoAction, authUserByTokenAction } from 'twreporter-registration'

/* global __REDUX_STATE__ */
let reduxState
if (window.__REDUX_STATE__) {
  try {
    reduxState = JSON.parse(unescape(__REDUX_STATE__))
  } catch (e) {
    reduxState = {}
  }
  let md = new MobileDetect(window.navigator.userAgent)
  if (md.tablet()) {
    reduxState.device = 'tablet'
  } else if (md.mobile()) {
    reduxState.device = 'mobile'
  } else {
    reduxState.device = 'desktop'
  }
}

const store = configureStore(reduxState)

const history = syncHistoryWithStore(browserHistory, store)

// token can be stored in localStorage in two scenario
// 1. TWReporter account sign in
// 2. oAuth
// Acount: store auth info during signin action
// oAuth: cookie -> redux state -> localStorage -> delete authinfo in redux state
// The following procedure is only for oAuth
const { auth } = store.getState()
if(auth.authenticated && auth.authInfo && (auth.authType=== 'facebook' || auth.authType==='google')) {
  setupTokenInLocalStorage(auth.authInfo)
  store.dispatch(deletAuthInfoAction())
}

// Check if token existed in localStorage and expired
// following preocedure is for both accoutn and oAuth SignIn
// 7 = 7 days
store.dispatch(authUserByTokenAction(7, auth.authType))
  .then(() => {})
  .catch(() => {})

const device = store.getState().device
ReactDOM.render((
  <Provider store={store}>
    <DeviceProvider device={device}>
      { createRoutes(history) }
    </DeviceProvider>
  </Provider>
), document.getElementById('root'))
