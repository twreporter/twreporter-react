/*eslint no-console: 0*/
/*global __DEVELOPMENT__ webpackIsomorphicTools */
import 'babel-polyfill'
import Compression from 'compression'
import Express from 'express'
import path from 'path'

import React from 'react'
import ReactDOMServer from 'react-dom/server'
//import ReactDOMStream from 'react-dom-stream/server'
import createLocation from 'history/lib/createLocation'
//import DocumentMeta from 'react-document-meta'
import { RouterContext, match, createMemoryHistory } from 'react-router'
import Promise from 'bluebird'
import httpProxy from 'http-proxy'

import configureStore from '../src/store/configureStore'
import crateRoutes from '../src/routes/index'
import DeviceProvider from '../src/components/DeviceProvider'

import { Provider } from 'react-redux'
import config from './config'

import { NotFoundError } from '../src/lib/custom-error'
import { SITE_NAME, LINK_PREFIX, SITE_META } from '../src/constants/'

// lodash
import get from 'lodash/get'

const server = new Express()
const targetUrl = 'http://' + config.apiHost + ':' + config.apiPort
// create a proxy server to serve the API requests
const proxy = httpProxy.createProxyServer({
  target: targetUrl
})

server.set('views', path.join(__dirname, 'views'))
server.set('view engine', 'ejs')
server.use(Compression())

const oneDay = 86400000
server.use('/asset', Express.static(path.join(__dirname, '../static/asset'), { maxAge: oneDay * 7 }))
server.use('/dist', Express.static(path.join(__dirname, '../static/dist'), { maxAge: oneDay }))
server.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://www.twreporter.org/')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Cache-Control', 'public, max-age=900')
  next()
})


// mock apis
//server.get('/questions', (req, res)=> {
//  let { questions } = require('./mock_api');
//  res.send(questions);
//});
//
server.get('/robots.txt', (req, res) => {
  res.format({
    'text/plain': function () {
      res.status(200).render('robots')
    }
  })
})
// proxy to the API server
server.use('/api', (req, res) => {
  proxy.web(req, res)
})

// added the error handling to avoid https://github.com/nodejitsu/node-http-proxy/issues/527
proxy.on('error', (error, req, res) => {
  let json
  if (error.code !== 'ECONNRESET') {
    console.error('proxy error', error)
  }
  if (!res.headersSent) {
    res.writeHead(500, { 'content-type': 'application/json' })
  }
  json = { error: 'proxy_error', reason: error.message }
  res.end(JSON.stringify(json))
})

server.get('*', async function (req, res) {
  if (__DEVELOPMENT__) {
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    webpackIsomorphicTools.refresh()
  }
  let history = createMemoryHistory()
  let store = configureStore()

  let routes = crateRoutes(history)

  let location = createLocation(req.url)

  match({ routes, location }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(301, redirectLocation.pathname + redirectLocation.search)
    } else if (error) {
      res.status(500).render('500', error)
    } else if (renderProps == null) {
      res.status(404).render('404')
    } else {
      let [ getCurrentUrl, unsubscribe ] = subscribeUrl()
      let reqUrl = location.pathname + location.search
      store.dispatch({
        type: 'DETECT_DEVICE',
        headers: get(req, [ 'headers', 'user-agent' ])
      })

      const getReduxPromise = function () {
        let { query, params } = renderProps
        let comp = renderProps.components[renderProps.components.length - 1].WrappedComponent
        let promise = comp.fetchData ?
          comp.fetchData({ query, params, store, history }) :
          Promise.resolve()

        return promise
      }

      getReduxPromise().then(()=> {
        let fatalError = store.getState().fatalError
        if (fatalError) {
          throw fatalError
        }
        let assets = webpackIsomorphicTools.assets()
        {/* styles (will be present only in production with webpack extract text plugin) */}
        let styles = ''
        {
          Object.keys(assets.styles).map((style, key) => {
            styles += ReactDOMServer.renderToString(<link async href={assets.styles[style]} key={key} media="screen, projection" rel="stylesheet" type="text/css" charSet="UTF-8"/>)
          })
        }
        let pageState = store.getState()
        let ogImage = SITE_META.LOGO
        let title = SITE_NAME.FULL
        let canonical = SITE_META.URL_NO_SLASH
        let desc = SITE_META.DESC
        let ogType = 'website'
        if (pageState['selectedArticle']['id']) {
          let currentArticle = get(pageState, [ 'entities', 'articles', get(pageState, 'selectedArticle.id') ], null)
          if (currentArticle) {
            // if this page is an article
            canonical = SITE_META.URL_NO_SLASH + LINK_PREFIX.ARTICLE + get(currentArticle, 'slug', '')
            title = get(currentArticle, 'title', title) + SITE_NAME.SEPARATOR + SITE_NAME.SHORT
            desc = get(currentArticle, 'ogDescription', desc)
            ogType = 'article'
            if (currentArticle['ogImage']) {
              ogImage = get(currentArticle, 'ogImage.image.resizedTargets.desktop.url', '')
            } else if (currentArticle['heroImage']) {
              ogImage = get(currentArticle, 'heroImage.image.resizedTargets.desktop.url', '')
            }
          } else {
            res.status(500).render('500')
          }
        }

        if ( getCurrentUrl() === reqUrl ) {
          //res.render('index', { html, reduxState, styles, javascript: assets.javascript.main })
          let reduxState = escape(JSON.stringify(store.getState()))
          let html = ReactDOMServer.renderToString(
              <Provider store={store} >
                <DeviceProvider device={get(store.getState(), 'device')}>
                  { <RouterContext {...renderProps} /> }
                </DeviceProvider>
              </Provider>
          )
          res.write(
`<!DOCTYPE html>
<html amp lang="zh-Hant-TW">
<head>
  <meta charset="utf-8">
  <title>${title}</title>
  <meta http-equiv="content-type" content="text/html; charset=utf-8" />
  <meta http-equiv="Cache-control" content="public">
  <meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1, initial-scale=1"/>
  <meta name="apple-mobile-web-app-capable" content="yes"/>
  <meta name="keywords" content="${SITE_META.KEYWORDS}"/>
  <meta name="description" content="${desc}" data-rdm/>
  <meta property="og:rich_attachment" content="true"/>
  <meta property="og:type" content="${ogType}"/>
  <meta property="og:url" content="${canonical}"/>
  <meta property="og:title" content="${title}" data-rdm/>
  <meta property="og:site_name" content="${SITE_NAME.SHORT}"/>
  <meta property="og:image" content="${ogImage}"/>
  <meta name="twitter:card" content="summary_large_image"/>
  <meta name="twitter:image" content="${ogImage}"/>
  <meta name="twitter:title" content="${title}" data-rdm/>
  <meta name="twitter:description" content="" data-rdm/>
  <meta name="theme-color" content="#E30B20">
  <link rel="canonical" href="${canonical}" data-rdm/>
  <link rel="alternate" type="application/rss+xml" title="RSS 2.0" href="https://www.twreporter.org/rss2.xml" />
  <!-- debug usage -->
  <!--<script src="https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.3/plugins/debug.addIndicators.js"></script>-->
  <link href="/asset/favicon.png"  rel="shortcut icon" />
  ${styles}
  <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
  <script async src="https://cdn.ampproject.org/v0.js"></script>
</head>
<body>
  <div id="root">${html}</div>
  <!-- Load Intl Polyfill -->
  <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=Intl.~locale.zh-Hant-TW"></script>
  <!-- Google Tag Manager -->
  <amp-analytics>
  <noscript><iframe src="//www.googletagmanager.com/ns.html?id=GTM-NB59ZP"
  height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
  <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  '//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-NB59ZP');</script>
  </amp-analytics>
  <!-- End Google Tag Manager -->
  </script>
  <script type="text/javascript" charset="utf-8">
  window.__REDUX_STATE__ = '${reduxState}';
  </script>
  <script async type="text/javascript" charset="utf-8" src='${assets.javascript.main}'></script>
</body>
</html>
<link rel="stylesheet" href="/asset/font.css">
`)
          res.end()
          //DocumentMeta.rewind()   // render custom ducument title
        } else {
          res.redirect(302, getCurrentUrl())
        }
        unsubscribe()
      }).catch((err) => {
        console.log(err.stack)
        if (err instanceof NotFoundError) {
          res.status(404)
          res.render('404')
          return
        }
        res.status(500)
        let errStack = err.stack.split('\n')
        res.render('500', { error: errStack })
      })
    }
  })

  function subscribeUrl() {
    let currentUrl = location.pathname + location.search
    let unsubscribe = history.listen((newLoc) => {
      if (newLoc.action === 'PUSH') {
        currentUrl = newLoc.pathname + newLoc.search
      }
    })
    return [
      ()=> currentUrl,
      unsubscribe
    ]
  }
})

if (config.port) {
  server.listen(config.port, (err) => {
    if (err) {
      console.error(err)
    }
    console.info('----\n==> ✅  %s is running, talking to API server on %s.', config.app.title, config.apiPort)
    console.info('==> 💻  Open http://%s:%s in a browser to view the app.', config.host, config.port)
  })
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified')
}

module.exports = server
