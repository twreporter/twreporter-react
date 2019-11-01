/*
 * @param {Object} observer - A MutationObserver object 
 * @param {number} asyncTimerId - A positive integer value which identifies the timer created by the call to setTimeout()
 * @returns {void}
 */
function reset(observer, asyncTimerId) {
  if (observer) {
    observer.disconnect()
  }
  if (asyncTimerId) {
    clearTimeout(asyncTimerId)
  }
}

/*
 * @param {string} id - element id 
 * @returns {boolean} - represents whether document can get element by id 
 */
function scrollToElement(id) {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView()
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
        let observer = null
        let asyncTimerId = null
        const id = hash.replace('#', '')
        // Since id will be encoded by browser, decode it back as a string
        const decodedId = decodeURIComponent(id)
        // Create a `MutationObserver` instance to watch for changes being made to the DOM tree.
        // Since `document.getElementById(id)` returns null when navigating from a different page 
        // without element of id, for example: When navigating from an article page to homepage
        // with hash `#categories` in url, `document.getElementById('categories')` returns null.
        // In such case, the `MutationObserver` instance keeps watching and will call it's callback 
        // when the DOM tree changes, page scrolls to the desired element as long as it can be gotten by id.
        if (!scrollToElement(decodedId)) {
          observer = new MutationObserver(() => {
            if (scrollToElement(decodedId)) {
              reset(observer, asyncTimerId)
            }
          })
          observer.observe(document, {
            attributes: true,
            childList: true,
            characterData: true,
            subtree: true
          })
          // if the element doesn't show up in 10 seconds, stop checking
          asyncTimerId = setTimeout(() => {
            reset(observer, asyncTimerId)
          }, 10000)
        }
      }, 0)
    } 
  }

  return null
}

export default hashLinkScroll
