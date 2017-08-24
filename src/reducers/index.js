'use strict'
import { authReducer, configureReducer } from 'twreporter-registration'
import { searchedAuthorsList, authorsList } from './authors'
import { articlesByAuthor } from './author-articles'
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import device from './device'
import header from './header'
import merge from 'lodash/merge'
import twreporterRedux from 'twreporter-redux'

const { reducers, reduxStateFields } = twreporterRedux

const registrationInitialState = {
  apiUrl: '',
  signUp: '',
  signIn: '',
  activate: '',
  oAuthProviders: {
    google: '',
    facebook: ''
  },
  location: 'http://testtest.twreporter.org:3000',
  domain: 'twreporter.org'
}

const ConfigureReducer = configureReducer(registrationInitialState)

const rootReducer = combineReducers({
  [reduxStateFields.entities]: reducers.entities,
  [reduxStateFields.indexPage]: reducers.indexPage,
  [reduxStateFields.lists]: reducers.posts,
  [reduxStateFields.topicList]: reducers.topics,
  device,
  [reduxStateFields.selectedPost]: reducers.post,
  [reduxStateFields.selectedTopic]: reducers.topic,
  routing: routerReducer,
  header,
  searchedAuthorsList,
  authorsList,
  articlesByAuthor,
  authConfigure: ConfigureReducer,
  auth: authReducer,
  entitiesForAuthors: (state = {}, action) => {
    if (action.response && action.response.entities) {
      return merge({}, state, action.response.entities)
    }
    return state
  }
})

export default rootReducer
