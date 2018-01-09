import 'babel-polyfill'
import 'normalize.css'
import DeviceProvider from './components/DeviceProvider'
import MobileDetect from 'mobile-detect'
import React from 'react'
import ReactDOM from 'react-dom'
import ReactGA from 'react-ga'
import Router from 'react-router/lib/Router'
import browserHistory from 'react-router/lib/browserHistory'
import configureStore from './store/configureStore'
import createRoutes from './routes'
import match from 'react-router/lib/match'
import { Provider } from 'react-redux'
import { colors, layout, letterSpace, lineHeight, typography } from './themes/common-variables'
import { injectGlobal } from 'styled-components'
import { screen as mq } from './themes/screen'
import { syncHistoryWithStore } from 'react-router-redux'

// inject global styles into html
injectGlobal`
  html {
    font-size: ${typography.font.size.base};
    ::selection {
      background-color: ${colors.red.lightRed};
      color: $FFF;
    }
  }
  body {
    letter-spacing: ${letterSpace.generalLetterSpace};
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

    .hidden {
      display: none !important;
    }

    .container {
      line-height: ${lineHeight.linHeightLarge};
    }

    .inner-max {
      ${mq.desktopAbove`
        max-width: ${layout.article.innerWidth};
      `}
    }

    .outer-max {
      ${mq.desktopAbove`
        max-width: ${layout.article.outerWidth};
      `}
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
`

let reduxState
if (window.__REDUX_STATE__) {
  reduxState = window.__REDUX_STATE__

  let md = new MobileDetect(window.navigator.userAgent)
  if (md.tablet()) {
    reduxState.device = 'tablet'
  } else if (md.mobile()) {
    reduxState.device = 'mobile'
  } else {
    reduxState.device = 'desktop'
  }
}

const store = configureStore(browserHistory, reduxState)

const history = syncHistoryWithStore(browserHistory, store)

const device = store.getState().device

const routes = createRoutes(history)

function scrollToTopAndFirePageview() {
  if(window) {
    window.scrollTo(0, 0)
    // send Google Analytics Pageview event on router changed
    ReactGA.pageview(window.location.pathname)
  }
}

// calling `match` is simply for side effects of
// loading route/component code for the initial location
// https://github.com/ReactTraining/react-router/blob/v3/docs/guides/ServerRendering.md#async-routes
match({ history, routes }, (error, redirectLocation, renderProps) => {
  if (typeof window !== 'undefined') {
    // add Google Analytics
    ReactGA.initialize('UA-69336956-1')
    ReactGA.set({ page: window.location.pathname })
  }
  ReactDOM.hydrate((
    <Provider store={store}>
      <DeviceProvider device={device}>
        <Router {...renderProps} onUpdate={scrollToTopAndFirePageview}/>
      </DeviceProvider>
    </Provider>
  ), document.getElementById('root'))
})
