import { basePath, LINK_PREFIX, INTERACTIVE_ARTICLE_STYLE } from '../constants/index'

export function getAbsPath(pathname='', search='') {
  return basePath + pathname + search
}

export const formatPostLinkTo = (targetPostSlug = '', targetPostStyle = '') => (
  (targetPostStyle === INTERACTIVE_ARTICLE_STYLE) ? `${LINK_PREFIX.INTERACTIVE_ARTICLE}${targetPostSlug}` : `${LINK_PREFIX.ARTICLE}${targetPostSlug}`
)

export const formatPostLinkTarget = (targetPostStyle = '') => (
  targetPostStyle === INTERACTIVE_ARTICLE_STYLE ? '_blank' : null
)
