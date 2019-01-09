import get from 'lodash/get'
import pathToRegexp from 'path-to-regexp'
import routesConst from '../constants/routes'
import twreporterRedux from '@twreporter/redux'

const _ = {
  get
}

const { reduxStateFields } = twreporterRedux

export const themesConst = {
  normal: 'normal',
  photography: 'photography',
  withoutHeader: 'without-header',
  withoutHeaderAndFooter: 'without-header-footer'
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
      theme: (reduxState={}) => {
        const entities = reduxState[reduxStateFields.entities]
        const selectedPost = reduxState[reduxStateFields.selectedPost]
        const post = _.get(entities, [ reduxStateFields.postsInEntities, selectedPost.slug ], {})
        const style = post.style
        // photographic article page
        if (style === themesConst.photography) {
          return themesConst.photography
        }
        return themesConst.normal
      },
      params: reduxState
    } ]
  }

  /**
   *  @param {string} pathname
   *  @return {string} theme
   */
  getThemeByParsingPathname(pathname) {
    let theme = this.fallbackTheme
    this.themePathArr.some(themePathMap => {
      if (pathToRegexp(themePathMap.path).exec(pathname)) {
        if (typeof themePathMap.theme === 'function') {
          theme = themePathMap.theme(themePathMap.params)
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
