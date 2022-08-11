'use strict'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import serialize from 'serialize-javascript'

// @twreporter
import webfonts from '@twreporter/react-components/lib/text/utils/webfonts'

// lodash
import map from 'lodash/map'
const _ = {
  map,
}

export default class Html extends PureComponent {
  static propTypes = {
    scripts: PropTypes.array.isRequired,
    styles: PropTypes.array.isRequired,
    contentMarkup: PropTypes.string.isRequired,
    store: PropTypes.object.isRequired,
    styleElement: PropTypes.arrayOf(PropTypes.element).isRequired,
  }
  render() {
    const { contentMarkup, scripts, store, styleElement, styles } = this.props
    const head = Helmet.rewind()
    return (
      <html lang="zh-TW">
        <head>
          <script src="https://www.googleoptimize.com/optimize.js?id=OPT-NGNDMW8" />
          {head.base.toComponent()}
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
          {head.script.toComponent()}

          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta httpEquiv="content-type" content="text/html; charSet=utf-8" />
          <meta httpEquiv="Cache-control" content="public" />
          <meta
            name="viewport"
            content="viewport-fit=cover, width=device-width, user-scalable=no, minimum-scale=1, initial-scale=1"
          />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="theme-color" content="#E30B20" />
          <link
            rel="alternate"
            type="application/rss+xml"
            title="RSS 2.0"
            href="https://www.twreporter.org/a/rss2.xml"
          />
          <link rel="manifest" href="/meta/manifest.json" />
          {/* Add to home screen for Safari on iOS */}
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black" />
          <meta
            name="apple-mobile-web-app-title"
            content="報導者 The Reporter"
          />
          <link
            rel="apple-touch-icon"
            href="https://www.twreporter.org/images/apple-touch-icon-152x152.png"
          />
          {/* Title icon for windows */}
          <meta
            name="msapplication-TileImage"
            content="https://www.twreporter.org/images/icon-normal.png"
          />
          <meta name="msapplication-TileColor" content="#2F3BA2" />

          <link href="/asset/favicon.png" rel="shortcut icon" />
          <link rel="stylesheet" href="/asset/normalize.css" />
          {_.map(webfonts.fontGCSFiles, (fileSrc, key) => (
            <link
              rel="preload"
              href={fileSrc}
              key={'webfont' + key}
              as="font"
              crossOrigin="anonymous"
            />
          ))}
          {_.map(styles, (stylesheet, key) => (
            <link
              href={stylesheet}
              key={'stylesheet' + key}
              media="all"
              rel="stylesheet"
              type="text/css"
              charSet="UTF-8"
            />
          ))}
          {styleElement}
        </head>
        <body>
          <div id="root" dangerouslySetInnerHTML={{ __html: contentMarkup }} />
          <script
            defer
            src="https://cdn.polyfill.io/v2/polyfill.min.js?features=Intl.~locale.zh-Hant-TW"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.__REDUX_STATE__=${serialize(store.getState())};`,
            }}
            charSet="UTF-8"
          />
          {_.map(scripts, (script, key) => (
            <script src={script} key={'scripts' + key} charSet="UTF-8" />
          ))}
          {/* <!-- Load google fonts --> */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
              (function(document) {
                var gf = document.createElement("link"),
                gfApi = document.createElement("link");
                gf.rel="dns-prefetch";
                gf.href="https://fonts.googleapis.com";
                gfApi.rel="preconnect";
                gfApi.href="https://fonts.gstatic.com";
                gfApi.crossOrigin="anonymous";
                document.head.appendChild(gf);
                document.head.appendChild(gfApi);
                var wf = document.createElement("script"),
                webFontConfig={
                  google: {
                    families: ['Merriweather:700','Rosario:400,700','Noto+Serif+TC:500,600,700&display=swap']
                  }
                };
                wf.type = "text/javascript";
                wf.src = "https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js";
                wf.async = true;
                wf.onload=wf.onreadystatechange=function () {
                  try{
                    WebFont.load(webFontConfig);
                  }catch(e){};
                };
                document.head.appendChild(wf);
              })(document)`,
            }}
          />
          {/* <!-- End - Load google fonts--> */}
        </body>
      </html>
    )
  }
}
