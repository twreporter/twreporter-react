/* eslint no-console:0 */
/* global __DEVELOPMENT__, __CLIENT__*/
'use strict'
import { createStore as _createStore, applyMiddleware, compose } from 'redux'
import axios from 'axios'
import bs from './browser-storage'
import merge from 'lodash/merge'
import pick from 'lodash/pick'
import reduxStatePropKey from '../constants/redux-state-prop-key'
import rootReducer from '../reducers'
import throttle from 'lodash/throttle'
import thunkMiddleware from 'redux-thunk'

const _ = {
  merge,
  pick,
  throttle
}

function selectCacheFirstProp(reduxState) {
  const cacheableProps = [ reduxStatePropKey.nextNotifyPopupTS ]

  return _.pick(reduxState, cacheableProps)
}

export default async function configureStore(initialState, cookie) {
  const httpClientWithCookie = cookie ?
    // server side instance
    axios.create({
      headers: { cookie }
    }) :
    // client side instance
    axios.create({
      withCredentials: true
    })
  const middlewares = [ thunkMiddleware.withExtraArgument(httpClientWithCookie) ]
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
      // TODO find a better wat to use old redux state value
      const oldState = await bs.getReduxState()
      const cacheFirstState = selectCacheFirstProp(oldState)

      // sync redux state with browser storage
      await bs.syncReduxState(_.merge(reduxState, cacheFirstState))

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
