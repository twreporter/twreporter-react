/*global __DEVELOPMENT__ */
'use strict'
import { devCatListId, prodCatListId } from '../conf/list-id'

function getCatId(catName) {
  if (__DEVELOPMENT__) {
    return devCatListId[catName]
  }
  return prodCatListId[catName]
}

export {
  getCatId
}
