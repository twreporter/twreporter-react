import get from 'lodash/get'
import pathToRegexp from 'path-to-regexp'
import routesConst from '../constants/routes'
import twreporterRedux from '@twreporter/redux'

import querystring from 'querystring'

const _ = {
  get
}

const { reduxStateFields } = twreporterRedux

export const themesConst = {
  normal: 'normal',
  photography: 'photography',
  withoutHeader: 'without-header',
  withoutHeaderAndFooter: 'without-header-footer',
  articlePage: {
    fullscreen: {
      dark: 'article:fullscreen:dark',
      normal: 'article:fullscreen:normal'
    },
    v2: {
      default: 'article:v2:default',
      photo: 'article:v2:photo',
      pink: 'article:v2:pink'
    }
  }
  // TODO implement topic page theme
  //topicPage: {
  //  fullscreen: {
  //    dark: 'topic:fullscreen:dark',
  //    normal: 'topic:fullscreen:normal',
  //  }
  //}
}

export default class ThemeManager {
  /**
   *  This callback type is called `getThemeCallback` and is used by get theme
   *  @callback getThemeCallback
   *  @param {Object} params
   */

  /**
   *  @param {Object[]} themePathArr
   *  @param {Object} themePathArr[]
   *  @param {string} themePathArr[].path - path
   *  @param {string|getThemeCallback} themePathArr[].theme - theme or callback function to get theme
   *  @param {Object} themePathArr[].params - params passed into `getThemeCallback` function
   *  @param {string} fallbackTheme - fallback theme
   */
  constructor(themePathArr=[], fallbackTheme=themesConst.normal) {
    if (!Array.isArray(themePathArr)) {
      this.themePathArr = []
    } else {
      this.themePathArr = themePathArr
    }

    this.fallbackTheme = fallbackTheme
  }

  /**
   *  @param {Object} reduxState - redux state
   *  @param {Object} reduxState.entites
   *  @param {Object} reduxState.selectedPost - current post
   *  @param {string} reduxState.selectedPost.slug - slug of post
   */
  prepareThemePathArrForAppShell(reduxState) {
    this.themePathArr = [ {
      path: routesConst.photographyPage.path,
      theme: themesConst.photography
    }, {
      path: routesConst.topicPage.path,
      theme: themesConst.withoutHeader
    }, {
      path: routesConst.aboutUsPage.path,
      theme: themesConst.withoutHeaderAndFooter
    }, {
      path: routesConst.articlePage.path,
      theme: (reduxState={}, location) => {
        const entities = reduxState[reduxStateFields.entities]
        const selectedPost = reduxState[reduxStateFields.selectedPost]
        const post = _.get(entities, [ reduxStateFields.postsInEntities, selectedPost.slug ], {})

        // TODO remove testing condition after testing done
        const searchObj = querystring.parse(_.get(location, 'search', '').slice(1))
        if (searchObj.theme === themesConst.articlePage.v2.pink ||
          searchObj.theme === themesConst.articlePage.v2.default ||
          searchObj.theme === themesConst.articlePage.v2.photo
        ) {
          post.style = searchObj.theme
        }

        const style = post.style

        switch(style) {
          case themesConst.photography:
          case themesConst.articlePage.v2.pink:
          case themesConst.articlePage.v2.default:
          case themesConst.articlePage.v2.photo:
          case themesConst.articlePage.fullscreen.dark:
          case themesConst.articlePage.fullscreen.normal: {
            return style
          }
          default: {
            return themesConst.normal
          }
        }
      },
      params: reduxState
    } ]
  }

  /**
   *  @param {string} pathname
   *  @return {string} theme
   */
  getThemeByParsingPathname(location) {
    let theme = this.fallbackTheme
    this.themePathArr.some(themePathMap => {
      if (pathToRegexp(themePathMap.path).exec(location.pathname)) {
        if (typeof themePathMap.theme === 'function') {
          // TODO remove location after testing
          theme = themePathMap.theme(themePathMap.params, location)
        } else {
          theme = themePathMap.theme
        }
        return true
      }
      return false
    })

    return theme
  }
}
