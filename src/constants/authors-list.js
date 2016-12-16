'use strict'

export const REQUEST_PAGE_START_FROM = 0
export const MAX_RESULTS_PER_FETCH = 12
export const RETURN_DELAY = 1000 //ms
export const MAX_RESULTS_PER_SEARCH = 50

export const LOAD_MORE_AUTHORS_BTN = '載入更多作者'
export const LOADING_MORE_AUTHORS = '載入更多作者'
export const SEARCHING_AUTHOR_NAME = '搜尋作者'
export function NO_RESULT(keywords) {
  if (keywords) {
    return `找不到關鍵字為「${keywords}」的結果`
  }
  return '找不到相關的結果'
}
