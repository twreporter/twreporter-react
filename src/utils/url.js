import siteMeta from '../constants/site-meta'

export function getAbsPath(pathname = '', search = '') {
  return siteMeta.urlOrigin + pathname + search
}

export const formatPostLinkTo = (targetPostSlug = '', targetPostStyle = '') =>
  targetPostStyle === 'interactive'
    ? `/i/${targetPostSlug}`
    : `/a/${targetPostSlug}`

export const formatPostLinkTarget = (targetPostStyle = '') =>
  targetPostStyle === 'interactive' ? '_blank' : undefined
