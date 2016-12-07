'use strict'
import { ARTICLE_STYLE, INTERACTIVE_ARTICLE_STYLE, LONGFORM_ARTICLE_STYLE, REVIEW_ARTICLE_STYLE } from '../constants/index'

export function isArticlePageType(pageType) {
  switch(pageType) {
    case ARTICLE_STYLE:
    case INTERACTIVE_ARTICLE_STYLE:
    case LONGFORM_ARTICLE_STYLE:
    case REVIEW_ARTICLE_STYLE:
      return true
    default:
      return false
  }
}
