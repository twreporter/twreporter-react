import * as types from '../constants/action-types'
import failActionCreators from './error-action-creators'
import twreporterRedux from '@twreporter/redux'
// lodash
import get from 'lodash/get'

const formAPIURL = twreporterRedux.utils.formAPIURL

const _ = {
  get
}

const apiConfig = {
  timeout: 5000
}

const apiEndpoints = {
  getBookmarks: (userID) => `users/${userID}/bookmarks`,
  getSingleBookmark: (userID, bookmarkSlug) => `users/${userID}/bookmarks/${bookmarkSlug}`,
  createSingleBookmark: (userID) => `users/${userID}/bookmarks`,
  deleteSingleBookmark: (userID, bookmarkID) => `users/${userID}/bookmarks/${bookmarkID}`
}

/**
 * @typedef {Object} userData
 * @property {string} email - email of user
 * @property {string} id - id of user
 * @property {string} jwt - json web token issued by backend for this certain user
*/

/**
 * https://github.com/twreporter/go-api#get-bookmarks
 * https://github.com/twreporter/go-api/blob/master/models/bookmark.go
 * @typedef {Object} Bookmark
 * @property {number} id
 * @property {string} created_at
 * @property {string} updated_at
 * @property {string} deleted_at
 * @property {number} published_date
 * @property {string} slug
 * @property {string} host_name
 * @property {string} is_external
 * @property {string} title
 * @property {string} desc
 * @property {string} thumbnail
*/

/**
 * https://github.com/twreporter/go-api#create-a-bookmark
 * https://github.com/twreporter/go-api/blob/master/models/bookmark.go
 * @typedef {Object} BookmarkToBeCreated
 * @property {string} slug
 * @property {string} host
 * @property {string} is_external
 * @property {string} title
 * @property {string} desc
 * @property {string} thumbnail
 * @property {string} published_date
*/

/**
 * @typedef {Object} RequestAction
 * @property {string} type - The type of action
 * @property {string} payload.method - The HTTP request method
 * @property {string} payload.url - The target to send request
 * @property {Object} payload.body - The request body with POST, PUT, DELETE, or PATCH request
 * @property {Object} payload.headers - The request header
*/

/**
 * @typedef {Object} SuccessAction
 * @property {string} type - The type of action
 * @property {string} payload
 * @property {Object} payload.data - Response data
 * @property {Object} payload.headers - The response header
 * @property {string} payload.statusCode - Response status code
 * @property {Object} payload.config - details of response
*/

/**
 * @param {Object} axiosResponse
 * @param {string} actionType
 * @returns {SuccessAction}
 */
function buildSuccessActionFromRes(axiosResponse, actionType) {
  return {
    type: actionType,
    payload: {
      config: _.get(axiosResponse, 'config'),
      data: _.get(axiosResponse, 'data'),
      headers: _.get(axiosResponse, 'headers'),
      statusCode: _.get(axiosResponse, 'status')
    }
  }
}

/**
 *  @typedef {Object} FailAction
 *  @property {string} type - Action error type
 *  @property {string} payload
 *  @property {string} payload.statusCode - Response status code
 *  @property {string} payload.message - Error message
 *  @property {object} payload.error - Error object
*/


/**
 *
 *
 * @export
 * @param {string} jwt - access_token granted for the user
 * @param {number} uesrID - id of user
 * @param {BookmarkToBeCreated} bookmarkToBeCreated
 * @returns
 */
export function createSingleBookmark(jwt, uesrID, bookmarkToBeCreated) {
  return function (dispatch, getState, axiosInstanceWithUserCookie) {
    const url = formAPIURL(apiEndpoints.createSingleBookmark(uesrID), false)
    const axiosConfig = {
      timeout: apiConfig.timeout,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`
      }
    }
    const interceptor = axiosInstanceWithUserCookie.interceptors.request.use((config) => {
      const { method, url, headers, data } = config
      dispatch({
        type: types.singleBookmark.create.request,
        payload: {
          method,
          url,
          headers,
          body: data
        }
      })
      axiosInstanceWithUserCookie.interceptors.request.eject(interceptor)
      return config
    })
    return axiosInstanceWithUserCookie.post(url, bookmarkToBeCreated, axiosConfig)
      .then((res) => {
        const successAction = buildSuccessActionFromRes(res, types.singleBookmark.create.success)
        successAction.payload.createdBookmark = bookmarkToBeCreated
        dispatch(successAction)
      })
      .catch((error) => {
        const failAction = failActionCreators.axios(error, types.singleBookmark.create.failure)
        dispatch(failAction)
      })
  }
}


/**
 *
 *
 * @export
 * @param {string} jwt - access_token granted for the user
 * @param {number} userID - id of user
 * @param {number} offset - the offset of the request
 * @param {number} limit - max amount of records per fetch
 * @param {string} sort - sort by
 * @returns
 */
export function getMultipleBookmarks(jwt, userID, offset, limit, sort) {
  return function (dispatch, getState, axiosInstanceWithUserCookie) {
    const url = formAPIURL(`${apiEndpoints.getBookmarks(userID)}?offset=${offset}&limit=${limit}&sort=${sort}`, false)
    const axiosConfig = {
      timeout: apiConfig.timeout,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`
      }
    }
    const interceptor = axiosInstanceWithUserCookie.interceptors.request.use((config) => {
      const { method, url, headers, data } = config
      dispatch({
        type: types.multipleBookMarks.read.request,
        payload: {
          method,
          url,
          headers,
          body: data
        }
      })
      axiosInstanceWithUserCookie.interceptors.request.eject(interceptor)
      return config
    })
    return axiosInstanceWithUserCookie.get(url, axiosConfig)
      .then((res) => {
        const successAction = buildSuccessActionFromRes(res, types.multipleBookMarks.read.success)
        dispatch(successAction)
      })
      .catch((error) => {
        const failAction = failActionCreators.axios(error, types.multipleBookMarks.read.failure)
        dispatch(failAction)
      })
  }
}


/**
 *
 *
 * @export
 * @param {string} jwt - access_token granted for the user
 * @param {number} userID - id of user
 * @param {string} bookmarkSlug - the article slug of the bookmark. Ex: xxx-xxx-xxxxxxx-xx
 * @param {string} bookmarkHost - the hostname of the bookmark. Ex: 'https://www.xxxx.xx'
 * @returns
 */
export function getSingleBookmark(jwt, userID, bookmarkSlug, bookmarkHost) {
  return function (dispatch, getState, axiosInstanceWithUserCookie) {
    let url = formAPIURL(`${apiEndpoints.getSingleBookmark(userID, bookmarkSlug)}`, false)
    if (bookmarkHost) url += `&host=${bookmarkHost}`
    const axiosConfig = {
      timeout: apiConfig.timeout,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`
      }
    }
    const interceptor = axiosInstanceWithUserCookie.interceptors.request.use((config) => {
      const { method, url, headers, data } = config
      dispatch({
        type: types.singleBookmark.read.request,
        payload: {
          method,
          url,
          headers,
          body: data
        }
      })
      axiosInstanceWithUserCookie.interceptors.request.eject(interceptor)
      return config
    })
    return axiosInstanceWithUserCookie.get(url, axiosConfig)
      .then((res) => {
        const successAction = buildSuccessActionFromRes(res, types.singleBookmark.read.success)
        dispatch(successAction)
      })
      .catch((error) => {
        const failAction = failActionCreators.axios(error, types.singleBookmark.read.failure)
        dispatch(failAction)
      })
  }
}


/**
 *
 *
 * @export
 * @param {string} jwt - access_token granted for the user
 * @param {number} userID - id of user
 * @param {number} bookmarkID - id of bookmark
 * @returns
 */
export function deleteSingleBookmark(jwt, userID, bookmarkID) {
  return function (dispatch, getState, axiosInstanceWithUserCookie) {
    const url = formAPIURL(apiEndpoints.deleteSingleBookmark(userID, bookmarkID), false)
    const axiosConfig = {
      timeout: apiConfig.timeout,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`
      }
    }
    const interceptor = axiosInstanceWithUserCookie.interceptors.request.use((config) => {
      const { method, url, headers, data } = config
      dispatch({
        type: types.singleBookmark.delete.request,
        payload: {
          method,
          url,
          headers,
          body: data
        }
      })
      axiosInstanceWithUserCookie.interceptors.request.eject(interceptor)
      return config
    })
    return axiosInstanceWithUserCookie.delete(url, axiosConfig)
      .then((res) => {
        const successAction = buildSuccessActionFromRes(res, types.singleBookmark.delete.success)
        successAction.payload.bookmarkID = bookmarkID
        dispatch(successAction)
      })
      .catch((error) => {
        const failAction = failActionCreators.axios(error, types.singleBookmark.delete.failure)
        dispatch(failAction)
      })
  }
}
