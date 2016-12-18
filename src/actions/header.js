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
    pageType: pageType,
    percent: 0
  }
}

export function setPageTheme(theme) {
  return {
    type: types.SET_PAGE_THEME,
    pageTheme: theme
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

export function setBookmarksOfLongformArticle(bookmarks) {
  return {
    type: types.SET_BOOKMARKS_OF_LONGFORM_ARTICLE,
    bookmarks
  }
}

/**
 * @param {object} info - information for header
 * @param {string} info.articleId - id of article
 * @param {array} info.bookmarks - bookmarks of longform article
 * @param {number} info.readPercent - reading progress
 * @param {string} info.pageTitle - title of article
 * @param {string} info.pageTheme - theme of page
 * @param {string} info.pagetTopic - topic of article
 * @param {string} info.pageType - type of page
 * @param {array} info.topicArr - related articles in the same topic
 */
export function setHeaderInfo(info) {
  return {
    type: types.SET_HEADER_INFO,
    info
  }
}
