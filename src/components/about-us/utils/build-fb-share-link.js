const appId = '962589903815787'

export function buildFbShareLink(url) {
  const display = 'page'
  const encodedUrl = encodeURIComponent(url)
  return `https://www.facebook.com/dialog/feed?app_id=${appId}&display=${display}&link=${encodedUrl}`
}
