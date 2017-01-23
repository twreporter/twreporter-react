'use strict'
import React, { PropTypes } from 'react'
import get from 'lodash/get'
import map from 'lodash/map'
import { SITE_META } from '../constants/index'
// import { analytics } from '../config';

// lodash
const _ = {
  get,
  map
}

function Html({ children, head, reduxState, styles, script }) {
  return (
    <html lang="zh-Hant-TW">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta httpEquiv="content-type" content="text/html; charSet=utf-8" />
        <meta httpEquiv="Cache-control" content="public" />
        <meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1, initial-scale=1" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="keywords" content={SITE_META.KEYWORDS} />
        <meta name="theme-color" content="#E30B20" />
        <link rel="alternate" type="application/rss+xml" title="RSS 2.0" href="https://www.twreporter.org/rss2.xml" />
        <link href="/asset/favicon.png"  rel="shortcut icon" />
        { _.map(styles, (style, key) => {
          return <link async href={style} key={key} media="all" rel="stylesheet" type="text/css" charSet="UTF-8"/>
        }) }
        {head.title.toComponent()}
        {head.meta.toComponent()}
        {head.link.toComponent()}
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
        {/* <!-- Hotjar Tracking Code for https://www.twreporter.org/ --> */}
        <script
          dangerouslySetInnerHTML={{ __html:
            `(function(h,o,t,j,a,r){
                    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                    h._hjSettings={hjid:376929,hjsv:5};
                    a=o.getElementsByTagName('head')[0];
                    r=o.createElement('script');r.async=1;
                    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                    a.appendChild(r);
                })(window,document,'//static.hotjar.com/c/hotjar-','.js?sv=');`
          }}
        />
        {/* <!-- End - Hotjar Tracking Code for https://www.twreporter.org/ --> */}
      </body>
    </html>
  )
}

Html.propTypes = {
  head: PropTypes.object, // Helmet object
  styles: PropTypes.object,
  script: PropTypes.object,
  children: PropTypes.string
}

export default Html
