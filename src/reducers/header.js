'use strict'
import * as types from '../constants/action-types'

const initState = {
  articleTools: {
    isDesktopToolsDisplayed: false,
    isMobileToolsDisplayed: false
  }
}

function header(state = initState, action) {
  switch (action.type) {
    case types.SET_ARTICLE_TOOLS:
      return {
        ...state,
        articleTools: Object.assign({}, state.articleTools, action.toolsConfig)
      }
    case types.SET_HEADER_INFO:
      return {
        ...state,
        ...action.info
      }
    case types.SET_PROGRESS_PRECENTAGE:
      return {
        ...state,
        readPercent: action.percent
      }
    case types.SET_PAGE_TYPE:
      return {
        ...state,
        pageType: action.pageType,
        readPercent: action.percent
      }
    case types.SET_PAGE_THEME:
      return {
        ...state,
        pageTheme: action.pageTheme
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
    case types.SET_BOOKMARKS_OF_LONGFORM_ARTICLE:
      return {
        ...state,
        bookmarks: action.bookmarks
      }
    default:
      return state
  }
}

export default header
