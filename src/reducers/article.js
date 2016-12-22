'use strict'
import singleItem from './single-item'

function article(state = {}, action) {
  return singleItem(state, action)
}

export default article
