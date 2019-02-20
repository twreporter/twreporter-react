import config from '../../../config'

const releaseBranch = config.releaseBranch

const signInSearchKeys = {
  destination: 'destination'
}
const signInPathname = '/signin'
const signInHref = {
  master: {
    protocal: 'http',
    host: 'localhost:3000',
    pathname: signInPathname,
    searchKeys: signInSearchKeys
  },
  preview: {
    protocal: 'https',
    host: 'staging-accounts.twreporter.org',
    pathname: signInPathname,
    searchKeys: signInSearchKeys
  },
  staging: {
    protocal: 'https',
    host: 'staging-accounts.twreporter.org',
    pathname: signInPathname,
    searchKeys: signInSearchKeys
  },
  release: {
    protocal: 'https',
    host: 'accounts.twreporter.org',
    pathname: signInPathname,
    searchKeys: signInSearchKeys
  }
}[releaseBranch]

export default signInHref
