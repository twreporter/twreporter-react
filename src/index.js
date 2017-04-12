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
import { types, authUserAction } from 'twreporter-registration'

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
function authTokenChecker() {
  if(localStorage.getItem('setupTime')) {
    const setupTime = localStorage.getItem('setupTime')
    const now = new Date().getTime()
    let days = 3
    if(now-setupTime > days*24*60*60*1000) {
      localStorage.clear()
    }
  }
  if(localStorage.getItem('token')) {
    store.dispatch(authUserAction('verified token', ''))
  }
}
const browserLocalStorage = (typeof localStorage === 'undefined') ? null : localStorage
if(browserLocalStorage) {
  // Check OAuth and store token
  const { auth } = store.getState()
  if( typeof localStorage !== 'undefined' ) {
    if(auth.authenticated && auth.token) {
      const token = auth.token
      const now = new Date().getTime()
      localStorage.setItem('token', token)
      localStorage.setItem('setupTime', now)
      store.dispatch({ type: types.DELETE_OTOKEN })
    }
    authTokenChecker()
  }
}

const device = store.getState().device
ReactDOM.render((
  <Provider store={store}>
    <DeviceProvider device={device}>
      { createRoutes(history) }
    </DeviceProvider>
  </Provider>
), document.getElementById('root'))
