import get from 'lodash/get'
import pathToRegexp from 'path-to-regexp'
import routesConst from '../constants/routes'
import uiConst from '../constants/ui'
import twreporterRedux from '@twreporter/redux'
import querystring from 'querystring'

const _ = {
  get
}

const { reduxStateFields } = twreporterRedux

const defaultLayoutObj = {
  header: uiConst.header.default,
  footer: uiConst.footer.default
}

/**
 *  Layout Object
 *  @typedef {Object} LayoutObj
 *  @property {string} header - One of uiConst.header
 *  @property {string} footer - One of uiConst.footer
 */

/**
 *  Location Object Provided by `react-router`
 *  @typedef {Object} LocationOfReactRouter
 *  @property {string} pathname
 *  @property {string} search
 */

/**
 *  Description of getLayout function
 *  @name getLayoutFunc
 *  @function
 *  @param {Object} reduxState - redux state
 *  @param {LocationOfReactRouter} location
 *  @return {LayoutObj}
 */

/**
 *  Route Pathname to Layout
 *  @typedef {Object} PathnameToLayout
 *  @property {string} pathname - URL pathname
 *  @property {getLayoutFunc} getLayout - function to get layout object
 */

/**
 *  @constant
 *  @private
 *  @type {PathnameToLayout[]}
 */
const _pathnameToLayoutArr = [ {
  pathname: routesConst.photographyPage.path,
  getLayout: () => {
    return {
      header: uiConst.header.photo,
      footer: uiConst.footer.default
    }
  }
}, {
  pathname: routesConst.topicPage.path,
  getLayout: () => {
    return {
      header: uiConst.header.none,
      footer: uiConst.footer.default
    }
  }
}, {
  pathname: routesConst.aboutUsPage.path,
  getLayout: () => {
    return {
      header: uiConst.header.none,
      footer: uiConst.footer.none
    }
  }
}, {
  pathname: routesConst.articlePage.path,
  getLayout: (reduxState, location) => {
    const entities = reduxState[reduxStateFields.entities]
    const selectedPost = reduxState[reduxStateFields.selectedPost]
    const post = _.get(entities, [ reduxStateFields.postsInEntities, selectedPost.slug ], {})

    // TODO remove testing condition after testing done
    const searchObj = querystring.parse(_.get(location, 'search', '').slice(1))
    if (searchObj.theme === 'article:v2:pink' ||
      searchObj.theme === 'article:v2:default' ||
      searchObj.theme === 'article:v2:photo'
    ) {
      post.style = searchObj.theme
    }

    const style = post.style

    switch(style) {
      case 'article:v2:default': {
        if(post.hero_image_size === 'fullscreen') {
          return {
            header: uiConst.header.transparent,
            footer: uiConst.footer.default
          }
        }
        return defaultLayoutObj
      }
      case 'article:v2:photo': {
        if(post.hero_image_size === 'fullscreen') {
          return {
            header: uiConst.header.transparent,
            footer: uiConst.footer.default
          }
        }
        return {
          header: uiConst.header.photo,
          footer: uiConst.footer.default
        }
      }
      case 'article:v2:pink': {
        return {
          header: uiConst.header.pink,
          footer: uiConst.footer.default
        }
      }
      case 'photography': {
        return {
          header: uiConst.header.photo,
          footer: uiConst.footer.default
        }
      }
      case 'article:fullscreen:dark':
      case 'article:fullscreen:normal': {
        return {
          header: uiConst.header.transparent,
          footer: uiConst.footer.default
        }
      }
      default: {
        return defaultLayoutObj
      }
    }
  }
} ]

/**
 *  @exports
 *  @param {Object} reduxState - redux state
 *  @param {LocationOfReactRouter} location
 *  @return {LayoutObj}
 */
function getLayout(reduxState, location) {
  let layoutObj = defaultLayoutObj
  _pathnameToLayoutArr.some(pathnameToLayout => {
    if (pathToRegexp(pathnameToLayout.pathname).exec(location.pathname)) {
      layoutObj = pathnameToLayout.getLayout(reduxState, location)
      return true
    }
    return false
  })

  return layoutObj
}


/**
 *  ui manager module
 *  @module managers/ui
 */
export default {
  getLayoutObj: getLayout
}
