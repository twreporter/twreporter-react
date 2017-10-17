import 'babel-polyfill'
import DeviceProvider from './components/DeviceProvider'
import MobileDetect from 'mobile-detect'
import React from 'react'
import ReactDOM from 'react-dom'
import configureStore from './store/configureStore'
import createRoutes from './routes'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import { match, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

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

const device = store.getState().device

const routes = createRoutes(history)

// calling `match` is simply for side effects of
// loading route/component code for the initial location
// https://github.com/ReactTraining/react-router/blob/v3/docs/guides/ServerRendering.md#async-routes
match({ history, routes }, (error, redirectLocation, renderProps) => {
  ReactDOM.render((
    <Provider store={store}>
      <DeviceProvider device={device}>
        <Router {...renderProps} />
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
            <Router {...renderProps} />
            <DevTools />
          </div>
        </DeviceProvider>
      </Provider>
    ), document.getElementById('root'))
  })
}
