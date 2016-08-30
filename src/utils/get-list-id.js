'use strict'
import { devCatListId, devTopicListId, prodCatListId, prodTopicListId } from '../conf/list-id'

function getCatId(catName) {
  if (global.__DEVELOPMENT__) {
    return devCatListId[catName]
  }
  return prodCatListId[catName]
}

function getTopicId(topicName) {
  if (global.__DEVELOPMENT__) {
    return devTopicListId[topicName]
  }
  return prodTopicListId[topicName]
}

export {
  getCatId,
  getTopicId
}
