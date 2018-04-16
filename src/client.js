import 'babel-polyfill'
import 'normalize.css'
import React from 'react'
import ReactDOM from 'react-dom'
import ReactGA from 'react-ga'
import Router from 'react-router/lib/Router'
import browserHistory from 'react-router/lib/browserHistory'
import configureStore from './store/configure-store'
import createRoutes from './routes'
import match from 'react-router/lib/match'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'

let reduxState
if (window.__REDUX_STATE__) {
  reduxState = window.__REDUX_STATE__
}

configureStore(browserHistory, reduxState)
  .then((store) => {
    const history = syncHistoryWithStore(browserHistory, store)

    const routes = createRoutes(history)

    function scrollToTopAndFirePageview() {
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
      if (typeof window !== 'undefined') {
        // add Google Analytics
        ReactGA.initialize('UA-69336956-1')
        ReactGA.set({ page: window.location.pathname })
      }
      ReactDOM.hydrate((
        <Provider store={store}>
          <Router {...renderProps} onUpdate={scrollToTopAndFirePageview}/>
        </Provider>
      ), document.getElementById('root'))
    })
  })

