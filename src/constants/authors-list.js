'use strict'

export const NUMBER_OF_FIRST_RESPONSE_PAGE = 0
export const MAX_RESULTS_PER_FETCH = 24 // for authors list
export const RETURN_DELAY_TIME = 1000 //ms
export const MAX_RESULTS_PER_SEARCH = 48 // for searching

export const LOAD_MORE_AUTHORS_BTN = '載入更多作者'
export const LOADING_MORE_AUTHORS = '載入更多作者'
export const SEARCHING_AUTHOR_NAME = '搜尋作者'
export function NO_RESULT(keywords) {
  if (keywords) {
    return `找不到關鍵字為「${keywords}」的結果`
  }
  return '找不到相關的結果'
}

export const SEARCH_AUTHORS_FAILURE_MESSAGE = 'ERROR：資料伺服器錯誤'
export const LIST_ALL_AUTHORS_FAILURE_MESSAGE = 'ERROR：資料伺服器錯誤'

export const AUTHORS_LIST = 'authorsList'
export const SEARCHED_AUTHORS_LIST = 'searchedAuthorsList'
