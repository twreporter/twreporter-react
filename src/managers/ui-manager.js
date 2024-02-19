import pathToRegexp from 'path-to-regexp'
// constants
import routesOld from '../constants/routes-old'
import routesNew from '../constants/routes'
import uiConst from '../constants/ui'
import colors from '../constants/colors'
// @twreporter
import twreporterRedux from '@twreporter/redux'
import { colorGrayscale } from '@twreporter/core/lib/constants/color'
// lodash
import get from 'lodash/get'
// feature toggle
import { MY_READING } from '@twreporter/core/lib/constants/feature-flag'

const routesConst = MY_READING ? routesNew : routesOld

const _ = {
  get,
}

const { reduxStateFields } = twreporterRedux

const styleConst = {
  v1: {
    photo: 'photography',
    fullscreenDark: 'article:fullscreen:dark',
    fullscreenNormal: 'article:fullscreen:normal',
    review: 'review',
    longform: 'longform',
    article: 'article',
  },
  v2: {
    default: 'article:v2:default',
    photo: 'article:v2:photo',
    pink: 'article:v2:pink',
  },
}

const defaultLayoutObj = {
  headerType: uiConst.header.default,
  footerType: uiConst.footer.default,
  backgroundColor: colorGrayscale.gray100,
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
const _pathnameToLayoutArr = [
  {
    pathname: routesConst.photographyPage.path,
    getLayout: () => {
      return {
        headerType: uiConst.header.photo,
        footerType: uiConst.footer.default,
        backgroundColor: colors.photographyColor,
      }
    },
  },
  {
    pathname: routesConst.topicPage.path,
    getLayout: () => {
      return {
        headerType: uiConst.header.transparent,
        footerType: uiConst.footer.default,
        backgroundColor: colorGrayscale.gray100,
      }
    },
  },
  {
    pathname: routesConst.aboutUsPage.path,
    getLayout: () => {
      return {
        headerType: uiConst.header.none,
        footerType: uiConst.footer.none,
        backgroundColor: colorGrayscale.gray100,
      }
    },
  },
  {
    pathname: routesConst.articlePage.path,
    getLayout: reduxState => {
      const { entities, selectedPost, postsInEntities } = reduxStateFields
      const postSlug = _.get(reduxState, [selectedPost, 'slug'], '')
      const postId = _.get(
        reduxState,
        [entities, postsInEntities, 'slugToId', postSlug],
        ''
      )
      const post = _.get(
        reduxState,
        [entities, postsInEntities, 'byId', postId],
        {}
      )
      switch (getArticleV2Style(post.style)) {
        case styleConst.v2.pink: {
          return {
            headerType: uiConst.header.pink,
            footerType: uiConst.footer.default,
            backgroundColor: colors.culturePink,
          }
        }
        case styleConst.v2.photo: {
          if (post.hero_image_size === 'fullscreen') {
            return {
              headerType: uiConst.header.transparent,
              footerType: uiConst.footer.default,
              backgroundColor: colors.photographyColor,
            }
          }
          return {
            headerType: uiConst.header.photo,
            footerType: uiConst.footer.default,
            backgroundColor: colors.photographyColor,
          }
        }
        case styleConst.v2.default:
        default: {
          if (post.hero_image_size === 'fullscreen') {
            return {
              headerType: uiConst.header.transparent,
              footerType: uiConst.footer.default,
              backgroundColor: colorGrayscale.gray100,
            }
          }
          return defaultLayoutObj
        }
      }
    },
  },
]

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
      layoutObj = pathnameToLayout.getLayout(reduxState)
      return true
    }
    return false
  })

  return layoutObj
}

/**
 *
 *
 * @param {string} postStyle
 * @returns {string} One of `styleConst.v2`
 */
function getArticleV2Style(postStyle) {
  switch (postStyle) {
    case styleConst.v2.pink:
    case styleConst.v2.default:
    case styleConst.v2.photo: {
      return postStyle
    }
    case styleConst.v1.photo: {
      return styleConst.v2.photo
    }
    case styleConst.v1.review:
    case styleConst.v1.longform:
    case styleConst.v1.article:
    case styleConst.v1.fullscreenDark:
    case styleConst.v1.fullscreenNormal:
    default: {
      return styleConst.v2.default
    }
  }
}

/**
 *  ui manager module
 *  @module managers/ui
 */
export default {
  getLayoutObj: getLayout,
  getArticleV2Style,
}
