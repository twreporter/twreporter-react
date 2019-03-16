import get from 'lodash/get'
import merge from 'lodash/merge'
import statusCode from '../constants/status-code'

const _ = {
  get,
  merge
}

/**
 *  actionError type definition
 *  @typedef {Object} ErrorAction
 *  @property {string} type - Action error type
 *  @property {string} payload
 *  @property {string} payload.statusCode - Response status code
 *  @property {string} payload.headers - Server response headers
 *  @property {string} payload.message - Error message
 *  @property {Object} payload.config - Axios config object
 *  @property {Object} payload.request - An instance of `XMLHttpRequest` in the browser or an instance of `http.ClientRequest` in node.js
*/

/**
 * @param {Object} [invalidFields] - object with invalid fields and resaons
 * @param {string} failActionType
 * @returns {ErrorAction}
 */
function handleValidationFailureBeforeRequest(invalidFields, failActionType) {
  return {
    type: failActionType,
    payload: {
      message: 'Data validation failed before the http request was made.',
      data: invalidFields,
      statusCode: statusCode.badRequest
    }
  }
}

/**
 *  @param {Object} [err={}] - Error returned from axios
 *  @param {string} failActionType
 *  @returns {ErrorAction}
 */
function handleAxiosError(err = {}, failActionType) {
  if (err.response) {
    return {
      type: failActionType,
      payload: {
        data: _.get(err, 'response.data'),
        message: _.get(err, 'response.data.message'),
        statusCode: _.get(err, 'response.status'),
        headers: _.get(err, 'response.headers'),
        config: _.get(err, 'config')
      }
    }
  } else if (err.request) {
    return {
      type: failActionType,
      payload: {
        message: 'A request was made but no response was received.',
        request: _.get(err, 'request'),
        config: _.get(err, 'config')
      }
    }
  } else {
    return {
      type: failActionType,
      payload: {
        message: 'An error occured when setting up the request: ' + _.get(err, 'message', ''),
        config: _.get(err, 'config')
      }
    }
  }
}

export default {
  axios: handleAxiosError,
  preRequestValidation: handleValidationFailureBeforeRequest
}
