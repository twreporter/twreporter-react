'use strict'
import singleItem from './single-item'

function topic(state = {}, action) {
  return singleItem(state, action)
}

export default topic
