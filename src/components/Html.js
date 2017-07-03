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

function Html({ children, head, reduxState, styleTags, styles, script }) {
  return (
    <html lang="zh-TW">
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
        <link href="https://www.twreporter.org/images/apple-touch-icon.png" rel="apple-touch-icon" />
        <link href="https://www.twreporter.org/images/apple-touch-icon-152x152.png" rel="apple-touch-icon" sizes="152x152" />
        <link href="https://www.twreporter.org/images/apple-touch-icon-167x167.png" rel="apple-touch-icon" sizes="167x167" />
        <link href="https://www.twreporter.org/images/apple-touch-icon-180x180.png" rel="apple-touch-icon" sizes="180x180" />
        <link href="https://www.twreporter.org/images/icon-hires.png" rel="icon" sizes="192x192" />
        <link href="https://www.twreporter.org/images/icon-normal.png" rel="icon" sizes="128x128" />
        <link href="/asset/favicon.png"  rel="shortcut icon" />
        { _.map(styles, (style, key) => {
          return <link async href={style} key={key} media="all" rel="stylesheet" type="text/css" charSet="UTF-8"/>
        }) }
        <style dangerouslySetInnerHTML={{ __html: styleTags }} />
        {head.title.toComponent()}
        {head.meta.toComponent()}
        {head.link.toComponent()}
      </head>
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: children }} />
        <script defer src="https://cdn.polyfill.io/v2/polyfill.min.js?features=Intl.~locale.zh-Hant-TW" />
        <script
          type="text/javascript"
          charSet="utf-8"
          dangerouslySetInnerHTML={{ __html:
            `window.__REDUX_STATE__ = '${reduxState}'`
          }}
        />
        <script defer type="text/javascript" charSet="utf-8" src={script.main} />
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
