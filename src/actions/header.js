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
