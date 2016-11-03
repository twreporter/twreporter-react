'use strict'

// action-types

export const LOAD_MORE = 'LOAD_MORE'
export const FILETER_BY_AUTHOR_NAME = 'FILETER_BY_AUTHOR_NAME'

//action-creators

export function loadMore() {
  return {
    type: LOAD_MORE
  }
}

export function filterByAuthorName(keyword) {
  return {
    type: FILETER_BY_AUTHOR_NAME,
    keyword
  }
}
