import PropTypes from 'prop-types'
import React from 'react'
import getRoutes from './routes'
import { Provider } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { createGlobalStyle, css } from 'styled-components'
// components
import AppShell from './containers/app-shell'
// constants
import colors from './constants/colors'
import typography from './constants/typography'
// @twreporter
import releaseBranchConst from '@twreporter/core/lib/constants/release-branch'
import useFontFaceObserver from '@twreporter/react-components/lib/hook/use-font-face-observer'
import webfonts from '@twreporter/react-components/lib/text/utils/webfonts'
import {
  fonts,
  fontWeight,
  fontFamily,
} from '@twreporter/core/lib/constants/font'

// lodash
import map from 'lodash/map'

const _ = {
  map,
}

const selfHostedFonts = [fonts.notoSansTC]

const BaseStyle = css`
  html {
    font-size: ${typography.font.size.base};
    font-family: ${fontFamily.defaultFallback};
  }
  html.fontsLoaded {
    font-family: ${fontFamily.default};
  }
  body {
    overflow-x: hidden;
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
  }

  ::selection {
    background-color: ${colors.secondaryColor};
    color: ${colors.white};
  }
`

const GlobalStyle = createGlobalStyle`
  ${props => props.fontfaces}
  ${BaseStyle}
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

export default class App extends React.Component {
  static propTypes = {
    reduxStore: PropTypes.object,
    releaseBranch: PropTypes.oneOf([
      releaseBranchConst.master,
      releaseBranchConst.staging,
      releaseBranchConst.release,
    ]),
  }

  render() {
    const routes = getRoutes()
    const { reduxStore, releaseBranch } = this.props
    return (
      <Provider store={reduxStore}>
        <Route
          render={props => {
            return (
              <AppShell location={props.location} releaseBranch={releaseBranch}>
                <Switch>
                  {routes.map((route, routeIndex) => {
                    if (route.renderWithProps) {
                      route.render = props => (
                        <route.renderWithProps
                          releaseBranch={releaseBranch}
                          {...props}
                        />
                      )
                    }
                    return <Route key={`route-${routeIndex}`} {...route} />
                  })}
                </Switch>
              </AppShell>
            )
          }}
        />
        <GlobalStyleWithFonts fonts={selfHostedFonts} />
      </Provider>
    )
  }
}
