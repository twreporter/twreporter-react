/* global __DEVELOPMENT__, __CLIENT__*/
'use strict'
import ls from './local-storage'
import merge from 'lodash/merge'
import thunkMiddleware from 'redux-thunk'
import throttle from 'lodash/throttle'
import rootReducer from '../reducers'
import { createStore as _createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'

const _ = {
  merge,
  throttle
}

export default function configureStore(history, initialState) {
  // Sync dispatched route actions to the history
  const reduxRouterMiddleware = routerMiddleware(history)
  const middlewares = [ reduxRouterMiddleware, thunkMiddleware ]

  let finalCreateStore

  if (__DEVELOPMENT__ && __CLIENT__ && window.__REDUX_DEVTOOLS_EXTENSION__) {
    finalCreateStore = compose(
      applyMiddleware(...middlewares),
      window.__REDUX_DEVTOOLS_EXTENSION__()
    )(_createStore)
  } else {
    finalCreateStore = applyMiddleware(...middlewares)(_createStore)
  }

  let reduxState = initialState

  // check if redux state in localStorage is valid or not
  if (__CLIENT__ && !ls.isReduxStateExpired()) {
    // merge localStorage redux state copy with new redux state
    reduxState = _.merge(ls.getReduxState(), reduxState)
  }

  const store = finalCreateStore(rootReducer, reduxState)

  if (__DEVELOPMENT__ && module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  if (__CLIENT__) {

    // sync redux state with localStorage
    ls.syncReduxState(reduxState)

    // Subscribe the redux store changes.
    // Sync the localStorage after redux state change.
    store.subscribe(_.throttle(() => {
      ls.syncReduxState(store.getState())
    }, 1000))
  }

  return store
}
