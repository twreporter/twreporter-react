/*global __DEVELOPMENT__ */
'use strict'
import { devCatListId, devTopicListId, prodCatListId, prodTopicListId } from '../conf/list-id'

function getCatId(catName) {
  if (__DEVELOPMENT__) {
    return devCatListId[catName]
  }
  return prodCatListId[catName]
}

function getTopicId(topicName) {
  if (__DEVELOPMENT__) {
    return devTopicListId[topicName]
  }
  return prodTopicListId[topicName]
}

export {
  getCatId,
  getTopicId
}
