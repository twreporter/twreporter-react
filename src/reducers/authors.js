'use strict'
import types from '../actions/authors'

const authorsPage = (state = {}, action = {}) => {
  switch (action.type) {
    case types.LOAD_MORE:
      return Object.assign({}, state, {
        // 回傳 state 要修改的部分
      })
    case types.FILETER_BY_AUTHOR_NAME:
      return Object.assign({}, state, {
        // 回傳 state 要修改的部分
      })
    default:
      return state
  }
}

export default authorsPage
