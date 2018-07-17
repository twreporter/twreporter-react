import { fbAppId } from '../constants/data/matadata'

export function buildFbShareLink(url) {
  const display = 'page'
  const encodedUrl = encodeURIComponent(url)
  return `https://www.facebook.com/dialog/feed?app_id=${fbAppId}&display=${display}&link=${encodedUrl}`
}
