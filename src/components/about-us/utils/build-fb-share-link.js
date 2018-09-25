import { appId } from '../../../constants/index'

export function buildFbShareLink(url) {
  const display = 'page'
  const encodedUrl = encodeURIComponent(url)
  return `https://www.facebook.com/dialog/feed?app_id=${appId}&display=${display}&link=${encodedUrl}`
}
