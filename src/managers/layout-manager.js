import Footer from '@twreporter/react-components/lib/footer'
import React from 'react'
import uh from '@twreporter/universal-header'
import { themesConst } from './theme-manager'
import { colors } from '../themes/common-variables'

export default class LayoutManager {
  /**
   *  @param {Object} props
   *  @param {string} props.releaseBranch - 'master', 'test', 'staging' or 'release'
   *  @param {string} props.theme - check out `themesConst` for more information
   */
  constructor({ releaseBranch='master', theme=themesConst.normal }) {
    this.releaseBranch = releaseBranch
    this.theme = theme
  }


  /**
   *  @return {string} theme
   */
  getTheme() {
    return this.theme
  }

  /**
   *  @return {string} header html markup
   */
  getHeader() {
    // TODO Header of topic page should be modified
    // after the header 2.0 releases
    if (this.theme === themesConst.withoutHeader
      || this.theme === themesConst.withoutHeaderAndFooter) {
      return null
    }

    return (
      <uh.Header
        theme={this.theme}
        env={this.releaseBranch}
        isLinkExternal={false}
      />
    )
  }

  getFooter() {
    if (this.theme === themesConst.withoutHeaderAndFooter) {
      return null
    }
    return <Footer />
  }

  /**
   *  @return {string} background color
   */
  getBackgroundColor() {
    switch(this.theme) {
      case themesConst.photography: {
        return colors.photographyColor
      }
      case themesConst.normal:
      case themesConst.withoutHeader:
      default: {
        return colors.gray.lightGray
      }
    }
  }
}

