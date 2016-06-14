'use strict'
import * as types from '../constants/action-types'

function header(state = {}, action) {
  switch (action.type) {
    case types.SET_PROGRESS_PRECENTAGE:
      return {
        ...state,
        readPercent: action.percent
      }
    default:
      return state
  }
}

export default header
