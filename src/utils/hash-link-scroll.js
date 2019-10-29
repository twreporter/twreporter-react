let observer = null
let asyncTimerId = null

function reset() {
  if (observer) {
    observer.disconnect()
  }
  if (asyncTimerId) {
    clearTimeout(asyncTimerId)
  }
}

function getElementAndScroll(id) {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView()
    reset()
    return true
  }
  return false
}

// handle hash link scroll
// scroll to the anchor after DOM rendered
function hashLinkScroll() {
  if (window) {
    const { hash } = window.location
    if (hash !== '') {
      // Push onto callback queue so it runs after the DOM is updated
      setTimeout(() => {
        const id = hash.replace('#', '')
        // since id will be encoded by browser,
        // decode it back as a string
        const decodedID = decodeURIComponent(id)
        // Create a `MutationObserver` instance to watch for changes being made to the DOM tree.
        // Since `document.getElementById(id)` returns null when navigating from a different page 
        // without element of id, for example: When navigating from an article page to homepage
        // with hash `#categories` in url, `document.getElementById('categories')` returns null.
        // In such case, the `MutationObserver` instance keeps watching and will call it's callback 
        // when the DOM tree changes, page scrolls to the desired element as long as it can be gotten by id.
        if (!getElementAndScroll(decodedID)) {
          if (!observer) {
            observer = new MutationObserver(() => { getElementAndScroll(decodedID) })
          }
          observer.observe(document, {
            attributes: true,
            childList: true,
            subtree: true
          })
          // if the element doesn't show up in 10 seconds, stop checking
          asyncTimerId = setTimeout(() => {
            reset()
          }, 10000)
        }
      }, 0)
    } 
  }

  return null
}

export default hashLinkScroll
