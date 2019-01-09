'use strict'
import { searchedAuthorsList, authorsList } from './authors'
import { articlesByAuthor } from './author-articles'
import { combineReducers } from 'redux'
import * as types from '../constants/action-types'
import get from 'lodash/get'
import header from './header'
import merge from 'lodash/merge'
import reduxStatePropKey from '../constants/redux-state-prop-key'
import twreporterRedux from '@twreporter/redux'
import uh from '@twreporter/universal-header'

const _ = {
  get,
  merge
}

const authReducer = uh.reducers.auth

const { reducers } = twreporterRedux

const rootReducer = combineReducers({
  [reduxStatePropKey.entities]: reducers.entities,
  [reduxStatePropKey.indexPage]: reducers.indexPage,
  [reduxStatePropKey.lists]: reducers.posts,
  [reduxStatePropKey.topicList]: reducers.topics,
  [reduxStatePropKey.selectedPost]: reducers.post,
  [reduxStatePropKey.selectedTopic]: reducers.topic,
  [reduxStatePropKey.header]: header,
  [reduxStatePropKey.searchedAuthorsList]: searchedAuthorsList,
  [reduxStatePropKey.authorsList]: authorsList,
  [reduxStatePropKey.articlesByAuthor]: articlesByAuthor,
  [reduxStatePropKey.auth]: authReducer,
  [reduxStatePropKey.entitiesForAuthors]: (state = {}, action) => {
    const entities = _.get(action, 'normalizedData.entities')
    if (entities) {
      return _.merge({}, state, entities)
    }
    return state
  },
  [reduxStatePropKey.nextNotifyPopupTS]: (state=0, action) => {
    if (action.type === types.SET_NEXT_POPUP_TIME_STAMP) {
      return action.payload
    }
    return state
  }
})

export default rootReducer
