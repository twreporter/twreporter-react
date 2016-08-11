'use strict'
import * as types from '../constants/action-types'

export function setReadProgress(percent) {
  if(!percent || percent < 0) {
    percent = 0
  } else if(percent > 100) {
    percent = 100
  }

  return {
    type: types.SET_PROGRESS_PRECENTAGE,
    percent: percent
  }
}

export function setPageType(pageType) {
  return {
    type: types.SET_PAGE_TYPE,
    pageType: pageType
  }
}

export function setPageTitle(articleId, pageTitle, pageTopic=null) {
  return {
    type: types.SET_PAGE_TITLE,
    articleId: articleId,
    pageTitle: pageTitle,
    pageTopic: pageTopic
  }
}

export function setArticleTopicList(topicArr) {
  return {
    type: types.SET_ARTICLE_TOPIC_LIST,
    topicArr: topicArr
  }
}
