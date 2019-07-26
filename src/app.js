import ErrorBoundary from './components/ErrorBoundary'
import Footer from '@twreporter/react-components/lib/footer'
import Header from '@twreporter/universal-header/dist/containers/header'
import PropTypes from 'prop-types'
import React from 'react'
import WebPush from './containers/web-push'
import getRoutes from './routes'
import memoize from 'memoize-one'
import mq from '@twreporter/core/lib/utils/media-query'
import styled from 'styled-components'
import uiConst from './constants/ui'
import uiManager from './managers/ui-manager'
import values from 'lodash/values'
import { Provider } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { colors, lineHeight, typography } from './themes/common-variables'
import { createGlobalStyle } from 'styled-components'

const _ = {
  values
}

const AppBox = styled.div`
  background-color: ${props => props.backgroundColor};
`

const ContentBlock = styled.div`
  position: relative;
`

const TransparentHeader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
  ${mq.mobileOnly`
    position: relative;
  `}
`

// TODO add `pink` theme to universal-header
const PinkBackgroundHeader = styled.div`
  position: relative;
  background-color: #fabcf0;
`

class AppShell extends React.PureComponent {
  static propTypes = {
    releaseBranch: PropTypes.string.isRequired,
    layoutObj: PropTypes.shape({
      header: PropTypes.oneOf(
        _.values(uiConst.header)
      ),
      footer: PropTypes.oneOf(
        _.values(uiConst.footer)
      ),
      backgroundColor: PropTypes.string
    })
  }

  static defaultProps = {
    layoutObj: {
      header: uiConst.header.default,
      footer: uiConst.footer.default,
      backgroundColor: '#f1f1f1'
    }
  }

  renderHeader() {
    const { layoutObj, releaseBranch } = this.props

    switch(layoutObj.header) {
      case uiConst.header.none: {
        return null
      }
      case uiConst.header.pink: {
        return (
          <PinkBackgroundHeader>
            <Header
              theme="transparent"
              releaseBranch={releaseBranch}
              isLinkExternal={false}
            />
          </PinkBackgroundHeader>
        )
      }
      case uiConst.header.photo: {
        return (
          <Header
            theme="photography"
            releaseBranch={releaseBranch}
            isLinkExternal={false}
          />
        )
      }
      case uiConst.header.transparent: {
        return (
          <TransparentHeader>
            <Header
              theme="transparent"
              releaseBranch={releaseBranch}
              isLinkExternal={false}
            />
          </TransparentHeader>
        )
      }
      default: {
        return (
          <Header
            theme="normal"
            releaseBranch={releaseBranch}
            isLinkExternal={false}
          />
        )
      }
    }
  }

  renderFooter() {
    const { layoutObj } = this.props

    switch(layoutObj.footer) {
      case uiConst.footer.none: {
        return null
      }
      case uiConst.footer.default:
      default: {
        return <Footer />
      }
    }
  }

  render() {
    const {
      layoutObj,
      children
    } = this.props

    return (
      <ErrorBoundary>
        <AppBox
          backgroundColor={layoutObj.backgroundColor}
        >
          <WebPush />
          <ContentBlock>
            {this.renderHeader()}
            {children}
            {this.renderFooter()}
          </ContentBlock>
        </AppBox>
      </ErrorBoundary>
    )
  }
}

const GlobalStyle = createGlobalStyle`
  html {
    font-size: ${typography.font.size.base};
  }
  body {
    overflow-x: hidden;
    overflow-y: auto;
    letter-spacing: 0.4px;
    line-height: ${lineHeight.lineHeightMedium};
    font-family: "source-han-sans-traditional", "Noto Sans TC", "PingFang TC", "Apple LiGothic Medium", Roboto, "Microsoft JhengHei", "Lucida Grande", "Lucida Sans Unicode", sans-serif;
    abbr[title], abbr[data-original-title] {
      border-bottom: 0;
    }
    *, :before, :after {
      box-sizing: border-box;
    }

    a, a:link, a:visited {
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
      line-height: ${lineHeight.linHeightLarge};
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
      display:block;
      margin-left:auto;
      margin-right:auto;
    }

    .visible-print {
      display: none;
    }

    figure, p {
      margin: 0;
    }

    strong {
      font-weight: ${typography.font.weight.bold};
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

export default class App extends React.Component {
  buildLayoutObjForAppShell = memoize((header, footer, backgroundColor) => ({
    header,
    footer,
    backgroundColor
  }))

  render() {
    const routes = getRoutes()
    const { reduxStore, releaseBranch } = this.props

    return (
      <Provider store={reduxStore}>
        <Route render={props => {
          const reduxState = reduxStore.getState()
          const { header, footer, backgroundColor } = uiManager.getLayoutObj(reduxState, props.location)
          return (
            <AppShell
              layoutObj={this.buildLayoutObjForAppShell(header, footer, backgroundColor)}
              releaseBranch={releaseBranch}
            >
              <Switch>
                {
                  routes.map((route, routeIndex) => (
                    <Route key={`route-${routeIndex}`} {...route} />
                  ))
                }
              </Switch>
            </AppShell>
          )
        }} />
        <GlobalStyle/>
      </Provider>
    )
  }
}
