'use strict'
import { searchedAuthorsList, authorsList } from './authors'
import { articlesByAuthor } from './author-articles'
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import device from './device'
import twreporterRedux from 'twreporter-redux'
import header from './header'

const { reducers, reduxStateFields } = twreporterRedux

const rootReducer = combineReducers({
  [reduxStateFields.entities]: reducers.entities,
  [reduxStateFields.indexPage]: reducers.indexPage,
  [reduxStateFields.lists]: reducers.posts,
  [reduxStateFields.topics]: reducers.topics,
  device,
  [reduxStateFields.selectedPost]: reducers.post,
  [reduxStateFields.selectedTopic]: reducers.topic,
  routing: routerReducer,
  header,
  searchedAuthorsList,
  authorsList,
  articlesByAuthor
})

export default rootReducer
