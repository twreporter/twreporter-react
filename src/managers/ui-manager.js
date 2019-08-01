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

const colors = {
  culturePink: '#fadaf5',
  darkBlue: '#08192d',
  darkEarth: '#2c2c2c',
  lightGray: '#f1f1f1'
}

const defaultLayoutObj = {
  headerType: uiConst.header.default,
  footerType: uiConst.footer.default,
  backgroundColor: colors.lightGray
}

/**
 *  Layout Object
 *  @typedef {Object} LayoutObj
 *  @property {string} headerType - One of uiConst.header
 *  @property {string} footerType - One of uiConst.footer
 *  @property {string} backgroundColor - background color of page
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
      headerType: uiConst.header.photo,
      footerType: uiConst.footer.default,
      backgroundColor: colors.darkBlue
    }
  }
}, {
  pathname: routesConst.topicPage.path,
  getLayout: () => {
    return {
      headerType: uiConst.header.none,
      footerType: uiConst.footer.default,
      backgroundColor: colors.lightGray
    }
  }
}, {
  pathname: routesConst.aboutUsPage.path,
  getLayout: () => {
    return {
      headerType: uiConst.header.none,
      footerType: uiConst.footer.none,
      backgroundColor: colors.lightGray
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
            headerType: uiConst.header.transparent,
            footerType: uiConst.footer.default,
            backgroundColor: colors.lightGray
          }
        }
        return defaultLayoutObj
      }
      case 'article:v2:photo': {
        if(post.hero_image_size === 'fullscreen') {
          return {
            headerType: uiConst.header.transparent,
            footerType: uiConst.footer.default,
            backgroundColor: colors.darkBlue
          }
        }
        return {
          headerType: uiConst.header.photo,
          footerType: uiConst.footer.default,
          backgroundColor: colors.darkBlue
        }
      }
      case 'article:v2:pink': {
        return {
          headerType: uiConst.header.pink,
          footerType: uiConst.footer.default,
          backgroundColor: colors.culturePink
        }
      }
      case 'photography': {
        return {
          headerType: uiConst.header.photo,
          footerType: uiConst.footer.default,
          backgroundColor: colors.darkBlue
        }
      }
      case 'article:fullscreen:dark':
        return {
          headerType: uiConst.header.transparent,
          footerType: uiConst.footer.default,
          backgroundColor: colors.darkEarth
        }
      case 'article:fullscreen:normal': {
        return {
          headerType: uiConst.header.transparent,
          footerType: uiConst.footer.default,
          backgroundColor: colors.lightGray
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
