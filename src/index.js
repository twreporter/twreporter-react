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
import { types } from 'twreporter-registration'

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

// setup token expiration mechanism and verify token
const browserLocalStorage = (typeof localStorage === 'undefined') ? null : localStorage
if(browserLocalStorage) {
  (function authTokenChecker() {
    if(localStorage.getItem('setupTime')) {
      const setupTime = localStorage.getItem('setupTime')
      const now = new Date().getTime()
      let days = 3
      if(now-setupTime > days*24*60*60*1000) {
        localStorage.clear()
      }
    }
    if(localStorage.getItem('token')) {
      store.dispatch({
        type: types.AUTH_USER,
        payload: 'Authorize user with verified token'
      })
    }
  }())
}

const device = store.getState().device
ReactDOM.render((
  <Provider store={store}>
    <DeviceProvider device={device}>
      { createRoutes(history) }
    </DeviceProvider>
  </Provider>
), document.getElementById('root'))
