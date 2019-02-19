import * as types from '../constants/action-types'
import get from 'lodash/get'

const _ = {
  get
}

const initState = {
  actionType: null,
  isRequesting: false,
  bookmark: null,
  errorMessage: null
}

export default function bookmarkWidget(state = initState, action) {
  switch (action.type) {
    case types.singleBookmark.read.request:
    case types.singleBookmark.delete.request:
    case types.singleBookmark.create.request: {
      return {
        actionType: action.type,
        isRequesting: true,
        bookmark: _.get(state, 'bookmark'),
        errorMessage: null
      }
    }
    case types.singleBookmark.read.success: {
      return {
        actionType: action.type,
        isRequesting: false,
        bookmark: _.get(action, 'payload.record'),
        errorMessage: null
      }
    }
    case types.singleBookmark.delete.success: {
      return {
        actionType: action.type,
        isRequesting: false,
        bookmark: null,
        errorMessage: null
      }
    }
    case types.singleBookmark.create.success: {
      return {
        actionType: action.type,
        isRequesting: false,
        bookmark: _.get(action, 'payload.createdBookmark'),
        errorMessage: null
      }
    }
    case types.singleBookmark.read.failure:
    case types.singleBookmark.delete.failure:
    case types.singleBookmark.create.failure: {
      return {
        actionType: action.type,
        isRequesting: false,
        bookmark: _.get(state, 'bookmark'),
        errorMessage: _.get(action, 'payload.message')
      }
    }
    default:
      return state
  }
}
