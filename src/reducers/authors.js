'use strict'
import * as types from '../constants/action-types'

const initialStates = {
  isFetching: false
}

export const authorsList = (state = initialStates, action = {}) => {
  switch (action.type) {
    case types.FETCH_AUTHORS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case types.FETCH_AUTHORS_SUCCESS:
      return Object.assign({}, state, {
        // 回傳 state 要修改的部分
        isFetching: false,
        meta: action.meta
      })
    case types.FETCH_AUTHORS_FAILURE:
      return Object.assign({}, state, {
        // 回傳 state 要修改的部分
        isFetching: false,
        error: action.error
      })
    default:
      return state
  }
}
