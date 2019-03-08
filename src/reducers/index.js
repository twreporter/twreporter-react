'use strict'
import { authReducer, configureReducer, bookmarkReducer } from '@twreporter/registration'
import { searchedAuthorsList, authorsList } from './authors'
import { articlesByAuthor } from './author-articles'
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import * as types from '../constants/action-types'
import get from 'lodash/get'
import header from './header'
import merge from 'lodash/merge'
import reduxStatePropKey from '../constants/redux-state-prop-key'
import twreporterRedux from '@twreporter/redux'

const _ = {
  get,
  merge
}

const { reducers } = twreporterRedux

const registrationInitialState = {
  apiUrl: 'https://go-api.twreporter.org',
  signIn: '/v1/signin',
  activate: '/v1/activate',
  renew: '/v1/token',
  bookmark: '/bookmarks',
  user: '/v1/users',
  oAuthProviders: {
    google: '/v1/auth/google',
    facebook: '/v1/auth/facebook'
  },
  host: 'https://www.twreporter.org'
}

const ConfigureReducer = configureReducer(registrationInitialState)

const rootReducer = combineReducers({
  [reduxStatePropKey.entities]: reducers.entities,
  [reduxStatePropKey.indexPage]: reducers.indexPage,
  [reduxStatePropKey.lists]: reducers.posts,
  [reduxStatePropKey.topicList]: reducers.topics,
  [reduxStatePropKey.selectedPost]: reducers.post,
  [reduxStatePropKey.selectedTopic]: reducers.topic,
  [reduxStatePropKey.bookmarks]: bookmarkReducer,
  [reduxStatePropKey.routing]: routerReducer,
  [reduxStatePropKey.header]: header,
  [reduxStatePropKey.searchedAuthorsList]: searchedAuthorsList,
  [reduxStatePropKey.authorsList]: authorsList,
  [reduxStatePropKey.articlesByAuthor]: articlesByAuthor,
  [reduxStatePropKey.authConfigure]: ConfigureReducer,
  [reduxStatePropKey.auth]: authReducer,
  [reduxStatePropKey.entitiesForAuthors]: (state = {}, action) => {
    const entities = _.get(action, 'normalizedData.entities')
    if (entities) {
      // WORKAROUND:
      // When the data of an author is updated, we have not build the function to synchronize the author data saved in old post records on Algolia.
      // So the author data in post records that already existed will be outdated.
      // The temporarily solution is that we do not update authors in entities when fetching articles of an author.
      if (action.type === types.FETCH_AUTHOR_COLLECTION_SUCCESS) {
        return _.merge({}, state, { articles: entities.articles })
      }
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
