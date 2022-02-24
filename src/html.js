'use strict'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import map from 'lodash/map'
import serialize from 'serialize-javascript'

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
            content="width=device-width, user-scalable=no, minimum-scale=1, initial-scale=1"
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

          {/* <!-- Load typekit fonts for twreporter.org domain--> */}
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(d) {
                var config = {
                kitId: 'vlk1qbe',
                scriptTimeout: 3000,
                async: true
              },h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
            })(document);`,
            }}
          />
          {/* <!-- End - Load typekit fonts for twreporter.org domain--> */}
        </body>
      </html>
    )
  }
}
