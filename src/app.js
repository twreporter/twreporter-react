/* eslint-disable react/display-name */
import PropTypes from 'prop-types'
import React from 'react'
import getRoutes from './routes'
import { Provider } from 'react-redux'
import { Switch, Route, useLocation, useRouteMatch } from 'react-router-dom'
import styled, { createGlobalStyle, css } from 'styled-components'
// context
import { CoreContext } from './contexts'
// components
import AppShell from './containers/app-shell'
import DonwloadPage from './components/member-page/donation/download-page'
// constants
import typography from './constants/typography'
import routesConst from './constants/routes'
// hooks
import { usePrevious } from './hooks'
// @twreporter
import { BRANCH_PROP_TYPES } from '@twreporter/core/lib/constants/release-branch'
import useFontFaceObserver from '@twreporter/react-components/lib/hook/use-font-face-observer'
import webfonts from '@twreporter/react-components/lib/text/utils/webfonts'
import {
  fonts,
  fontWeight,
  fontFamily,
} from '@twreporter/core/lib/constants/font'
import {
  SnackBar,
  useSnackBar,
} from '@twreporter/react-components/lib/snack-bar'
import mq from '@twreporter/core/lib/utils/media-query'
import {
  colorGrayscale,
  colorSupportive,
} from '@twreporter/core/lib/constants/color'
// lodash
import map from 'lodash/map'
import get from 'lodash/get'
const _ = {
  map,
  get,
}

const selfHostedFonts = [fonts.notoSansTC]

const BaseStyle = css`
  html {
    font-size: ${typography.font.size.base};
    font-family: ${fontFamily.defaultFallback};
    -webkit-font-smoothing: antialiased;
  }
  html.fontsLoaded {
    font-family: ${fontFamily.default};
  }
  body {
    overflow-x: auto;
    overflow-y: auto;
    letter-spacing: 0.4px;
    line-height: 1.4;
    abbr[title],
    abbr[data-original-title] {
      border-bottom: 0;
    }
    *,
    :before,
    :after {
      box-sizing: border-box;
    }

    a,
    a:link,
    a:visited {
      text-decoration: none;
    }

    img {
      vertical-align: middle;
    }

    img.img-responsive {
      max-width: 100%;
      height: auto;
      display: block;
    }

    .hidden {
      display: none !important;
    }

    .container {
      line-height: 1.8;
    }

    .no-hover {
      border-bottom: 0 !important;
      &:after {
        display: none;
      }
      &:hover:after {
        width: 0;
        display: none;
      }
    }

    .text-justify {
      text-align: justify;
    }

    .text-center {
      text-align: center;
    }

    .center-block {
      display: block;
      margin-left: auto;
      margin-right: auto;
    }

    .visible-print {
      display: none;
    }

    figure,
    p {
      margin: 0;
    }

    strong {
      font-weight: ${fontWeight.bold};
    }

    @media print {
      .hidden-print {
        display: none !important;
      }
      .visible-print {
        display: block !important;
      }
      a[href]:after {
        content: '';
      }
    }

    &.disable-scroll {
      overflow: hidden;
    }
  }

  ::selection {
    background-color: ${colorSupportive.heavy};
    color: ${colorGrayscale.white};
  }
`

const GlobalStyle = createGlobalStyle`
  ${props => props.fontfaces}
  ${BaseStyle}
`

const SnackBarContainer = styled.div`
  position: fixed;
  bottom: 8px;
  z-index: 1;
  transition: opacity 100ms ease-in-out;
  opacity: ${props => (props.show ? 1 : 0)};
  display: flex;
  justify-content: center;
  width: 100%;
  ${mq.desktopAndAbove`
    bottom: 24px;
  `}
  ${mq.tabletAndBelow`
    bottom: calc(env(safe-area-inset-bottom, 0) + 60px + 8px); // tab bar 60px
    padding: 0 16px;
  `}
  & > div {
    max-width: 440px;
    max-width: 100%;
  }
`

const GlobalStyleWithFonts = ({ fonts = [] }) => {
  const fontfaces = _.map(fonts, font => webfonts.fontFaces[font]).join()
  useFontFaceObserver(
    _.map(fonts, font => ({ family: font })),
    // add classname 'fontsLoaded' to <html> to apply the loaded fonts
    // to address FOUT issue
    () => {
      document.documentElement.className += ' fontsLoaded'
    }
  )

  return <GlobalStyle fontfaces={fontfaces} />
}

GlobalStyleWithFonts.propTypes = {
  fonts: PropTypes.arrayOf(PropTypes.string),
}

const App = ({ reduxStore, releaseBranch }) => {
  const location = useLocation()
  const prevLocation = usePrevious(location)
  const routes = getRoutes()
  const routeJSX = routes.map((route, routeIndex) => {
    if (route.renderWithProps) {
      route.render = props => (
        <route.renderWithProps releaseBranch={releaseBranch} {...props} />
      )
    }
    return <Route key={`route-${routeIndex}`} {...route} />
  })
  const { showSnackBar, snackBarText, toastr } = useSnackBar()
  const contextValue = {
    releaseBranch,
    referrerPath: _.get(prevLocation, 'pathname', ''),
    toastr,
  }

  const matchDownload = useRouteMatch(routesConst.download.donationHistory.path)
  return (
    <Provider store={reduxStore}>
      {matchDownload ? (
        <Route path={routesConst.download.donationHistory.path}>
          <DonwloadPage />
        </Route>
      ) : (
        <CoreContext.Provider value={contextValue}>
          <Route
            render={props => {
              return (
                <AppShell location={location}>
                  <Switch>{routeJSX}</Switch>
                </AppShell>
              )
            }}
          />
          <SnackBarContainer show={showSnackBar}>
            <SnackBar text={snackBarText} />
          </SnackBarContainer>
        </CoreContext.Provider>
      )}
      <GlobalStyleWithFonts fonts={selfHostedFonts} />
    </Provider>
  )
}
App.propTypes = {
  reduxStore: PropTypes.object,
  releaseBranch: BRANCH_PROP_TYPES,
}

export default App
