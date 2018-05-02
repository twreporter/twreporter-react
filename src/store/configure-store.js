/* eslint no-console:0 */
/* global __DEVELOPMENT__, __CLIENT__*/
'use strict'
import bs from './browser-storage'
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

export default async function configureStore(history, initialState) {
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
  if (__CLIENT__) {
    try {
      const isExpired = await bs.isReduxStateExpired()
      if(!isExpired) {
        // merge localStorage redux state copy with new redux state
        const _state = await bs.getReduxState()
        reduxState = _.merge(_state, reduxState)
        await bs.syncReduxState(reduxState)
      } else {
        // sync redux state with browser storage
        await bs.syncReduxState(reduxState)
      }

      const store = finalCreateStore(rootReducer, reduxState)

      if (__DEVELOPMENT__ && module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
          const nextRootReducer = require('../reducers').default
          store.replaceReducer(nextRootReducer)
        })
      }

      // Subscribe the redux store changes.
      // Sync the browser storage after redux state change.
      store.subscribe(_.throttle(() => {
        bs.syncReduxState(store.getState())
      }, 1000))
      return store
    } catch(err) {
      console.error('Sync-ing with browser storage occurs error:', err)
      return finalCreateStore(rootReducer, reduxState)
    }
  }
  return finalCreateStore(rootReducer, reduxState)
}
