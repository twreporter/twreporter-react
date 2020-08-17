export default {
  isPathWhitelisted: (whitelist, absoluteUrlString) => {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    const path = new URL(absoluteUrlString).pathname
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex)
    })
  },
}
