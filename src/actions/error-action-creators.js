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
 *  @property {string} payload.message - Error message
 *  @property {object} payload.error - Error object
 *  @property {Object} payload.config - details of response
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
      message: 'data validation failed before the http request was make',
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
    if (err.response.status === statusCode.badRequest) {
      return {
        type: failActionType,
        payload: {
          message: 'response bad request due to data validation failures',
          data: _.get(err, 'response.data'),
          statusCode: err.response.status,
          config: _.get(err, 'response.status')
        }
      }
    }
    return {
      type: failActionType,
      payload: {
        data: _.get(err, 'response.data'),
        message: _.get(err, 'response.data.message'),
        statusCode: err.response.status,
        config: _.get(err, 'response.status')
      }
    }
  } else if (err.request) {
    console.log('An axios error occured:', err) // eslint-disable-line
    return {
      type: failActionType,
      payload: {
        message: 'request was made but no response was received'
      }
    }
  } else {
    console.log('An axios error occured:', err) // eslint-disable-line
    return {
      type: failActionType,
      payload: {
        message: 'error happened in setting up the request that triggered an error'
      }
    }
  }
}

export default {
  axios: handleAxiosError,
  preRequestValidation: handleValidationFailureBeforeRequest
}
