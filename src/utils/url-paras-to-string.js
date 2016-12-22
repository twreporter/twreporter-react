'use strict'

import forOwn from 'lodash/forOwn'
import sortBy from 'lodash/sortBy'

const _ = {
  forOwn,
  sortBy
}

export function urlParasToString(object) {
  let searchParasArray = []
  // * Iterates over own enumerable properties of the object
  _.forOwn(object, (value, key)=>{
    searchParasArray.push([ key,value ])
  })
  // * Sort the parameters by their keys
  const sortedArray = _.sortBy(searchParasArray, (item)=>(item[0]))
  const stringArray = sortedArray.map((item)=>(item[0]+'='+item[1]))
  return stringArray.join('&') // To "aa=A&ab=B&ac=C&ad=D&ae=E"
}
