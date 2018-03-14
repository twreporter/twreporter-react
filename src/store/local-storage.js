/* eslint no-console:0*/
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
    reduxStatePropKey.routing, reduxStatePropKey.searchedAuthorsList,
    reduxStatePropKey.authorsList, reduxStatePropKey.articlesByAuthor,
    reduxStatePropKey.entitiesForAuthors
  ]

  return _.pick(reduxState, cacheableProps)
}

/**
 * Check if the copy in the localStorage expired or not
 *
 * @returns {bool} - true for expired
 */
function isReduxStateExpired() {
  if (window && window.localStorage) {
    const ls = window.localStorage
    const expires = ls.getItem(keys.expires)
    const now = Date.now()

    if (now < expires) {
      return false
    }
  }
  return true
}

/**
 * Set redux state into localStoroage as a copy.
 * However, it will refine the redux state before setting.
 *
 * @param {Object} reduxState - redux state
 * @returns {Object} refined redux state
 */
function setReduxState(reduxState) {
  let _state = reduxState
  if (window && window.localStorage) {
    const ls = window.localStorage
    _state = selectCacheablePropInReduxState(reduxState)
    ls.setItem(keys.state, JSON.stringify(_state))
  }
  return _state
}

/**
 * Set redux state expire time into localStoroage.
 *
 * @param {number} [maxAge=600] - measure in seconds
 * @returns {Object} expire time - Date.now() + maxAge
 */
function setReduxStateExpires(maxAge=600) {
  const expires = Date.now() + (maxAge * 1000)
  if (window && window.localStorage) {
    const ls = window.localStorage
    ls.setItem(keys.expires, expires)
  }
  return expires
}

/**
 * Get redux state copy in the localStorage
 *
 * @returns {Object} a redux state copy in the localStorage
 */
function getReduxState() {
  let state = {}
  if (window && window.localStorage) {
    const ls = window.localStorage
    try {
      state = JSON.parse(ls.getItem(keys.state))
    } catch(e) {
      console.error('Can not JSON.parse redux_state in localStorage: ', e)
    }
  }
  return state
}


/**
 * Synchronize the redux state in the store with its copy in the localStorage.
 *
 * @param {Object} reduxState - redux state you want to set into localStorage
 * @param {number} [maxAge=600] - default value is 600 seconds. Date.now() + maxAge = expire time
 * @returns {Object} redux state merged with the copy in the localStorage
 */
function syncReduxState(reduxState, maxAge=600) {
  if (isReduxStateExpired()) {
    const _state = setReduxState(reduxState)
    setReduxStateExpires(maxAge)
    return _state
  }

  return setReduxState(_.merge(getReduxState(), reduxState))
}

export default {
  getReduxState,
  isReduxStateExpired,
  syncReduxState
}
