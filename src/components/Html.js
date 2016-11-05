'use strict'
import React, { PropTypes } from 'react'
import get from 'lodash/get'
import map from 'lodash/map'
import { SITE_META, SITE_NAME } from '../constants/index'
// import { analytics } from '../config';

// lodash
const _ = {
  get,
  map
}

function Html({ canonical, children, description, meta, reduxState, styles, script, title }) {
  return (
    <html lang="zh-Hant-TW">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <title>{title}</title>
        <meta httpEquiv="content-type" content="text/html; charSet=utf-8" />
        <meta httpEquiv="Cache-control" content="public" />
        <meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1, initial-scale=1" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="keywords" content={SITE_META.KEYWORDS} />
        <meta name="description" content={description} />
        <meta property="og:rich_attachment" content="true" />
        <meta property="og:type" content={_.get(meta, 'ogType', 'website')} />
        <meta property="og:url" content={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:site_name" content={SITE_NAME.FULL} />
        <meta property="og:image" content={_.get(meta, 'ogImage')} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={_.get(meta, 'ogImage')} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="theme-color" content="#E30B20" />
        <link rel="canonical" href={canonical} />
        <link rel="alternate" type="application/rss+xml" title="RSS 2.0" href="https://www.twreporter.org/rss2.xml" />
        <link href="/asset/favicon.png"  rel="shortcut icon" />
        { _.map(styles, (style, key) => {
          return <link async href={style} key={key} media="screen, projection" rel="stylesheet" type="text/css" charSet="UTF-8"/>
        }) }
        {/* <!-- Google Tag Manager -->*/}
        <script
          dangerouslySetInnerHTML={{ __html:
            `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        '//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-NB59ZP');`
          }}
        />
        {/* <!-- End Google Tag Manager -->*/}
      </head>
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: children }} />
        <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=Intl.~locale.zh-Hant-TW" />
        <script
          type="text/javascript"
          charSet="utf-8"
          dangerouslySetInnerHTML={{ __html:
            `window.__REDUX_STATE__ = '${reduxState}'`
          }}
        />
        <script async type="text/javascript" charSet="utf-8" src={script.main} />
        <script src="https://use.typekit.net/ckp5jxu.js" />
        <script
          dangerouslySetInnerHTML={{ __html:
            'try{Typekit.load({ async: true });}catch(e){}'
          }}
        />
        {/* <!-- Google Tag Manager (noscript) --> */}
        <noscript>
          <iframe src="//www.googletagmanager.com/ns.html?id=GTM-NB59ZP" height="0" width="0" style={{ display:'none', visibility:'hidden' }}></iframe>
        </noscript>
        {/* <!-- End Google Tag Manager (noscript) --> */}
      </body>
    </html>
  )
}

Html.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  styles: PropTypes.object,
  script: PropTypes.object,
  chunk: PropTypes.string,
  children: PropTypes.string
}

export default Html
