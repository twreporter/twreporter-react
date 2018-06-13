/* eslint no-console:0*/
/* global __CLIENT__ */

// localForage is a fast and simple storage library for JavaScript.
// localForage improves the offline experience of your web app
// by using asynchronous storage (IndexedDB or WebSQL) with a simple, localStorage-like API.
import localForage from 'localforage'
import merge from 'lodash/merge'
import pick from 'lodash/pick'
import reduxStatePropKey from '../constants/redux-state-prop-key'

// These following functions are built for client side rendering,
// do not use them on the server side.

const _ = {
  merge,
  pick
}

const keys = {
  expires: 'redux_state_expires',
  state: 'redux_state'
}

/**
 * Create a new object with those properties of redux state we want
 *
 * @param {Object} reduxState redux state
 * @returns {Object} A copy of redux state with refined properties
 */
function selectCacheablePropInReduxState(reduxState) {
  // do not select those properties related to personal data,
  // such as bookmarks, auth ...etc
  const cacheableProps = [ reduxStatePropKey.entities, reduxStatePropKey.indexPage,
    reduxStatePropKey.lists, reduxStatePropKey.topicList,
    reduxStatePropKey.selectedPost, reduxStatePropKey.selectedTopic,
    reduxStatePropKey.routing,
    reduxStatePropKey.entitiesForAuthors,
    reduxStatePropKey.nextNotifyPopupTS

    // TODO author list page and author page have some bugs
    // after merging browser storage data. Hence, comment it just for now.
    // reduxStatePropKey.searchedAuthorsList,
    // reduxStatePropKey.authorsList,
    // reduxStatePropKey.articlesByAuthor,
  ]

  return _.pick(reduxState, cacheableProps)
}

/**
 * Check if the redux state copy in the browser storage expired or not
 *
 * @returns {Object} - A promise, resolve with true or false
 */
function isReduxStateExpired() {
  if (__CLIENT__) {
    return localForage.getItem(keys.expires)
      .then((expires) => {
        const now = Date.now()

        if (now < expires) {
          return false
        }
        return true
      })
  }
  return Promise.reject('isReduxStateExpired function should be executed on client side')
}

/**
 * Set redux state into localStoroage as a copy.
 * However, it will refine the redux state before setting.
 *
 * @param {Object} reduxState - redux state
 * @returns {Object} A Promise, resolve with redux state
 */
function setReduxState(reduxState) {
  let _state = reduxState
  if (__CLIENT__) {
    _state = selectCacheablePropInReduxState(reduxState)
    return localForage.setItem(keys.state, _state)
      .then(() => {
        return localForage.getItem(keys.state)
      })
  }
  return Promise.reject('setReduxState function should be executed on client side')
}

/**
 * Set redux state expire time into localStoroage.
 *
 * @param {number} [maxAge=600] - measure in seconds
 * @returns {Object} A Promise, resolve with (expire time = Date.now() + maxAge)
 */
function setReduxStateExpires(maxAge=600) {
  const expires = Date.now() + (maxAge * 1000)
  if (__CLIENT__) {
    return localForage.setItem(keys.expires, expires)
      .then(() => {
        return localForage.getItem(keys.expires)
      })
  }
  return Promise.reject('setReduxStateExpires function should be executed on client side')
}

/**
 * Get redux state copy in the browser storage
 *
 * @returns {Object}  A Promise, resolve with a redux state copy in the browser storage
 */
function getReduxState() {
  if (__CLIENT__) {
    return localForage.getItem(keys.state)
  }
  return Promise.reject('getReduxState function should be executed on client side')
}


/**
 * Synchronize the redux state in the store with its copy in the browser storage.
 *
 * @param {Object} reduxState - redux state you want to set into browser storage
 * @param {number} [maxAge=600] - default value is 600 seconds. Date.now() + maxAge = expire time
 * @returns {Object} A Promise, resovle with redux state merged with the copy in the browser storage
 */
function syncReduxState(reduxState, maxAge=600) {
  return isReduxStateExpired()
    .then((isExpired) => {
      if(isExpired) {
        return setReduxState(reduxState)
          .then((_state) => {
            return setReduxStateExpires(maxAge)
              .then(() => {
                return _state
              })
          })
      }
      return setReduxState(_.merge(getReduxState(), reduxState))
    })
    .catch((err) => {
      console.error('Operations by localForage library occurs error:', err)
    })
}

export default {
  getReduxState,
  isReduxStateExpired,
  syncReduxState
}
