// For website consistent, this file is extentsion of bootstrap variables
import { css } from 'styled-components'
import sz from '../constants/screen-size'

export const screen = {
  mobile: (...args) => css`
    @media (max-width: ${sz.smallScreenMaxWidth}px) {
      ${css(...args)}
    }
  `,
  tabletAbove: (...args) => css`
    @media (min-width: ${sz.mediumScreenMinWidth}px) {
      ${css(...args)}
    }
  `,
  tablet: (...args) => css`
    @media (min-width: ${sz.mediumScreenMinWidth}px) and (max-width: ${sz.mediumScreenMaxWidth}px) {
      ${css(...args)}
    }
  `,
  tabletBelow: (...args) => css`
    @media (max-width: ${sz.mediumScreenMaxWidth}px) {
      ${css(...args)}
    }
  `,
  desktopAbove: (...args) => css`
    @media (min-width: ${sz.largeScreenMinWidth}px) {
      ${css(...args)}
    }
  `,
  desktop: (...args) => css`
    @media (min-width: ${sz.largeScreenMinWidth}px) and (max-width: ${sz.largeScreenMaxWidth}px) {
      ${css(...args)}
    }
  `,
  desktopBelow: (...args) => css`
    @media (max-width: ${sz.largeScreenMaxWidth}px) {
      ${css(...args)}
    }
  `,
  overDesktop: (...args) => css`
    @media (min-width: ${sz.xLargeScreenMinWidth}px) {
      ${css(...args)}
    }
  `
}
