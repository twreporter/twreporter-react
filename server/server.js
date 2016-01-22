import Compression from 'compression'
import Express from 'express'
import path from 'path'

import React from 'react'
import ReactDOMServer from 'react-dom/server'
import createLocation from 'history/lib/createLocation'
import { RoutingContext, match } from 'react-router'
import createMemoryHistory from 'history/lib/createMemoryHistory'
import Promise from 'bluebird'
import httpProxy from 'http-proxy'

import configureStore from '../src/store/configureStore'
import crateRoutes from '../src/routes/index'

import { Provider } from 'react-redux'
import DeviceProvider from '../src/components/DeviceProvider'

const server = new Express()
const targetUrl = 'http://localhost:3000'
// create a proxy server to serve the API requests
const proxy = httpProxy.createProxyServer({
  target: targetUrl
})

server.set('views', path.join(__dirname, 'views'))
server.set('view engine', 'ejs')
server.use(Compression())
server.use(Express.static(path.join(__dirname, '../static')))
server.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://www.twreporter.org/')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
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
  proxy.web(req, res, { target: targetUrl } )
})

server.get('*', (req, res) => {
  let history = createMemoryHistory()
  let store = configureStore()

  let routes = crateRoutes(history)

  let location = createLocation(req.url)

  match({ routes, location }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(301, redirectLocation.pathname + redirectLocation.search)
    } else if (error) {
      res.status(500).render('500')
    } else if (renderProps == null) {
      res.status(404).render('404')
    } else {
      let [ getCurrentUrl, unsubscribe ] = subscribeUrl()
      let reqUrl = location.pathname + location.search
      store.dispatch({
        type: 'DETECT_DEVICE',
        req: req
      })

      const getReduxPromise = function () {
        let { query, params } = renderProps
        let comp = renderProps.components[renderProps.components.length - 1].WrappedComponent
        let promise = comp.fetchData ?
          comp.fetchData({ query, params, store, history }) :
          Promise.resolve()

        return promise
      }

      const device = store.getState().device

      getReduxPromise().then(()=> {
        let reduxState = escape(JSON.stringify(store.getState()))
        let html = ReactDOMServer.renderToString(
          <Provider store={store} >
            <DeviceProvider device={device}>
              { <RoutingContext {...renderProps} /> }
            </DeviceProvider>
          </Provider>
        )

        if ( getCurrentUrl() === reqUrl ) {
          res.render('index', { html, reduxState })
        } else {
          res.redirect(302, getCurrentUrl())
        }
        unsubscribe()
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

module.exports = server
