// For website consistent, this file is extentsion of bootstrap variables
import { css } from 'styled-components'

// const SCREEN_XS_MIN = 480
const TABLET_MIN = 768
const DESKTOP_MIN = 992
const DEKTOP_HD_MIN = 1200
const MOBILE_MAX = TABLET_MIN - 1
const TABLET_MAX = DESKTOP_MIN - 1
const DESKTOP_MAX = DEKTOP_HD_MIN - 1

export const breakPoints = {
  mobileMaxWidth: `${MOBILE_MAX}px`,
  tabletMinWidth: `${TABLET_MIN}px`,
  tabletMaxWidth: `${TABLET_MAX}px`,
  desktopMinWidth: `${DESKTOP_MIN}px`,
  desktopMaxWidth: `${DESKTOP_MAX}px`,
  overDesktopMinWidth: `${DEKTOP_HD_MIN}px`
}

export const layout = {
  tabletSmallWidth: '556px',
  tabletMediumWidth: '672px',
  tabletLargeWidth: `${TABLET_MIN}px`,
  desktopSmallWidth: '664px',
  desktopMediumWidth: '833px',
  desktopLargeWidth: '1024px',
  hdDesktopSmallWidth: '700px',
  hdDesktopMediumWidth: '880px',
  hdDesktopLargeWidth: '1440px'
}

export const screen = {
  mobile: (...args) => css`
    @media (max-width: ${breakPoints.mobileMaxWidth}) {
      ${css(...args)}
    }
  `,
  tabletAbove: (...args) => css`
    @media (min-width: ${breakPoints.tabletMinWidth}) {
      ${css(...args)}
    }
  `,
  tablet: (...args) => css`
    @media (min-width: ${breakPoints.tabletMinWidth}) and (max-width: ${breakPoints.tabletMaxWidth}) {
      ${css(...args)}
    }
  `,
  tabletBelow: (...args) => css`
    @media (max-width: ${breakPoints.tabletMaxWidth}) {
      ${css(...args)}
    }
  `,
  desktopAbove: (...args) => css`
    @media (min-width: ${breakPoints.desktopMinWidth}) {
      ${css(...args)}
    }
  `,
  desktop: (...args) => css`
    @media (min-width: ${breakPoints.desktopMinWidth}) and (max-width: ${breakPoints.desktopMaxWidth}) {
      ${css(...args)}
    }
  `,
  desktopBelow: (...args) => css`
    @media (max-width: ${breakPoints.desktopMaxWidth}) {
      ${css(...args)}
    }
  `,
  overDesktop: (...args) => css`
    @media (min-width: ${breakPoints.overDesktopMinWidth}) {
      ${css(...args)}
    }
  `
}
