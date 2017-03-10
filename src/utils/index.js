/*global __DEVELOPMENT__ */
'use strict'
import classNames from 'classnames'
import forOwn from 'lodash/forOwn'
import map from 'lodash/map'
import screenSize from '../constants/screen-size'
import sortBy from 'lodash/sortBy'
import startsWith from 'lodash/startsWith'
import { ARTICLE_STYLE, INTERACTIVE_ARTICLE_STYLE, LONGFORM_ARTICLE_STYLE, PHOTOGRAPHY_ARTICLE_STYLE, REVIEW_ARTICLE_STYLE } from '../constants/index'
import { devCatListId, prodCatListId } from '../conf/list-id'

const _ = {
  forOwn,
  map,
  sortBy,
  startsWith
}

export function isArticlePageType(pageType) {
  switch(pageType) {
    case ARTICLE_STYLE:
    case PHOTOGRAPHY_ARTICLE_STYLE:
    case INTERACTIVE_ARTICLE_STYLE:
    case LONGFORM_ARTICLE_STYLE:
    case REVIEW_ARTICLE_STYLE:
      return true
    default:
      return false
  }
}

export function getCatId(catName) {
  if (__DEVELOPMENT__) {
    return devCatListId[catName]
  }
  return prodCatListId[catName]
}

export function getScreenType(width) {
  if(width <= screenSize.smallScreenMaxWidth) {
    return 'MOBILE'
  } else if (width >= screenSize.mediumScreenMinWidth  && width <= screenSize.mediumScreenMaxWidth) {
    return 'TABLET'
  } else {
    return 'DESKTOP'
  }
}

export function shortenString(str, maxLen) {
  if(str && str.length > maxLen) {
    return str.substr(0, maxLen-1)+'...'
  }
  return str
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

export function getArticleEmbeddedQuery() {
  const list = [ 'authorImages', 'og_image', 'tags', 'categories' ]
  let query = {}
  list.forEach((ele) => {
    query[ele] = 1
  })
  return query
}

export function date2yyyymmdd(time, separator) {
  const date = new Date(time)
  const year = date.getFullYear()
  const mon = date.getMonth() + 1
  const day = date.getDate()
  return [ year, mon, day ].join(separator)
}


/**
 * Add tail space when head is a fullwidth bracket for visually centering
 * 
 * @param {string} text
 * @returns {string}
 */
export function addTailSpaceIfHeadIsFullwidthBracket(text) {
  if (typeof text === 'string') {
    const leftBrackets = [ '（', '【', '〔', '《', '〈', '｛', '『', '「' ]
    for (let i=0, length=leftBrackets.length; i<length; i++) {
      if (_.startsWith(text, leftBrackets[i])) {
        return (text + '  ')
      }
    }
  }
  return text
}


/**
 * Add a class name with theme name postfix
 * 
 * @param {object} styles - imported scss or css module
 * @param {string} className  - name of the element class
 * @param {string} themeName - name of the theme
 * @returns {string} class names like 'card-title card-title-small-card'
 */
export function addClassNameWithThemePostfix(styles={}, themeName, className) {
  return classNames(
    styles[className],
    themeName ? styles[themeName+'-'+className] : false
  )
}


/**
 * Return a curried funciton.(Partially applied function)
 * 
 * @param {function} fn - The target function you want to curry.
 * @param {any} curryArgs - The arguments you want to set.
 * @returns 
 */
export function partialApply(fn, ...partOfArgs) {
  if (typeof fn !== 'function') throw Error('The first argument should be a function.')
  return function (...elseArgs) {
    const patchedArgs = _.map(partOfArgs, function (arg) {
      if (arg === undefined) {
        return elseArgs.shift()
      }
      return arg
    })
    const args = patchedArgs.concat(elseArgs)
    return fn.apply(null, args)
  }
}

export * from './denormalize-articles'
export * from './image-processor'
export * from './url-processor'
export * from './higher-order-components'
