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
import { setupToken, deletAuthInfoAction, authUserByTokenAction } from 'twreporter-registration'

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

// Check OAuth and store token
const { auth } = store.getState()
if(auth.authenticated && auth.authInfo && (auth.authType=== 'facebook' || auth.authType==='google')) {
  setupToken(auth.authInfo)
  store.dispatch(deletAuthInfoAction())
}

store.dispatch(authUserByTokenAction(7, auth.authType))

const device = store.getState().device
ReactDOM.render((
  <Provider store={store}>
    <DeviceProvider device={device}>
      { createRoutes(history) }
    </DeviceProvider>
  </Provider>
), document.getElementById('root'))
