'use strict'
import * as types from '../constants/action-types'

function header(state = {}, action) {
  switch (action.type) {
    case types.SET_PROGRESS_PRECENTAGE:
      return {
        ...state,
        readPercent: action.percent
      }
    case types.SET_PAGE_TYPE:
      return {
        ...state,
        pageType: action.pageType
      }
    case types.SET_PAGE_TITLE:
      return {
        ...state,
        articleId: action.articleId,
        pageTitle: action.pageTitle,
        pageTopic: action.pageTopic
      }
    case types.SET_ARTICLE_TOPIC_LIST:
      return {
        ...state,
        topicArr: action.topicArr
      }
    default:
      return state
  }
}

export default header
