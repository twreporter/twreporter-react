import config from '../../../config'

const releaseBranch = config.releaseBranch

const signInSearchKeys = {
  destination: 'destination'
}
const signInPathname = '/signin'
const signInHref = {
  master: {
    protocol: 'http',
    host: 'localhost:3030',
    pathname: signInPathname,
    searchKeys: signInSearchKeys
  },
  preview: {
    protocol: 'https',
    host: 'staging-accounts.twreporter.org',
    pathname: signInPathname,
    searchKeys: signInSearchKeys
  },
  staging: {
    protocol: 'https',
    host: 'staging-accounts.twreporter.org',
    pathname: signInPathname,
    searchKeys: signInSearchKeys
  },
  release: {
    protocol: 'https',
    host: 'accounts.twreporter.org',
    pathname: signInPathname,
    searchKeys: signInSearchKeys
  }
}[releaseBranch]

function getSignInHref(destination = '') {
  const currentHrefSearch = destination ? '' : `?${signInHref.searchKeys.destination}=${destination}`
  return `${signInHref.protocol}://${signInHref.host}${signInHref.pathname}${currentHrefSearch}`
}

export default getSignInHref
