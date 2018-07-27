'use strict'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import map from 'lodash/map'
import serialize from 'serialize-javascript'
import { colors, lineHeight, typography } from '../themes/common-variables'
import { injectGlobal } from 'styled-components'

const _ = {
  map
}

// inject global styles into html
injectGlobal`
  html {
    font-size: ${typography.font.size.base};
  }
  body {
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

export default class Html extends PureComponent {
  static propTypes = {
    assets: PropTypes.object.isRequired,
    component: PropTypes.node,
    store: PropTypes.object.isRequired,
    styleElement: PropTypes.arrayOf(PropTypes.element).isRequired
  }
  render() {
    const { assets, content, store, styleElement } = this.props
    const head = Helmet.rewind()
    return (
      <html lang="zh-TW">
        <head>
          {head.base.toComponent()}
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
          {head.script.toComponent()}

          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta httpEquiv="content-type" content="text/html; charSet=utf-8" />
          <meta httpEquiv="Cache-control" content="public" />
          <meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1, initial-scale=1" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="theme-color" content="#E30B20" />
          <link rel="alternate" type="application/rss+xml" title="RSS 2.0" href="https://www.twreporter.org/rss2.xml" />
          <link rel="manifest" href="/meta/manifest.json" />
          {/* Add to home screen for Safari on iOS */}
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black" />
          <meta name="apple-mobile-web-app-title" content="報導者 The Reporter" />
          <link rel="apple-touch-icon" href="https://www.twreporter.org/images/apple-touch-icon-152x152.png" />
          {/* Title icon for windows */}
          <meta name="msapplication-TileImage" content="https://www.twreporter.org/images/icon-normal.png" />
          <meta name="msapplication-TileColor" content="#2F3BA2" />

          <link href="/asset/favicon.png"  rel="shortcut icon" />
          {_.map(assets.stylesheets, (stylesheet, key) =>
            <link href={stylesheet} key={'stylesheet' + key} media="all"
              rel="stylesheet" type="text/css" charSet="UTF-8"/>
          )}
          {styleElement}
        </head>
        <body>
          <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
          <script defer src="https://cdn.polyfill.io/v2/polyfill.min.js?features=Intl.~locale.zh-Hant-TW" />
          <script dangerouslySetInnerHTML={{ __html: `window.__REDUX_STATE__=${serialize(store.getState())};` }} charSet="UTF-8"/>
          <script src={assets.javascripts.main} charSet="UTF-8"/>

          {/* <!-- Load typekit fonts for twreporter.org domain--> */}
          <script
            dangerouslySetInnerHTML={{ __html:
              `(function(d) {
                var config = {
                kitId: 'ckp5jxu',
                scriptTimeout: 3000,
                async: true
              },h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
            })(document);`
            }}
          />
          {/* <!-- End - Load typekit fonts for twreporter.org domain--> */}
        </body>
      </html>
    )
  }
}
