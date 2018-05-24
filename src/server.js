/*eslint no-console: 0*/
/* global __DEVELOPMENT__ */
import 'babel-polyfill'
import Compression from 'compression'
import Express from 'express'
import Html from './helpers/Html'
import PrettyError from 'pretty-error'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import config from '../config'
import configureStore from './store/configure-store'
import cookieParser from 'cookie-parser'
import createRoutes, { ACTIVATE_PAGE_PATH, NO_CACHE_PAGES } from './routes/index'
import get from 'lodash/get'
import http from 'http'
import path from 'path'
import { NotFoundError } from './custom-error'
import { Provider } from 'react-redux'
import { RouterContext, match, createMemoryHistory } from 'react-router'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'
import { configureAction, authUserAction } from '@twreporter/registration'
import { syncHistoryWithStore } from 'react-router-redux'

/**
 * Define isomorphic constants.
 */
global.__CLIENT__ = false
global.__SERVER__ = true
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production'

const app = new Express()
const server = new http.Server(app)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(Compression())
app.use(cookieParser())

const oneDay = 86400000
app.use('/asset', Express.static(path.join(__dirname, '../static/asset'), { maxAge: oneDay * 7 }))
app.use('/dist', Express.static(path.join(__dirname, '../dist'), { maxAge: oneDay * 30 }))
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'https://www.twreporter.org/')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  next()
})

app.get('/robots.txt', (req, res) => {
  res.format({
    'text/plain': function () {
      res.status(200).render('robots')
    }
  })
})

app.get('/check', (req, res) => {
  res.status(200)
  res.end('server is running')
})

const selectResponseStatus = (errorType) => {
  switch(errorType) {
    case '404':
      return 404
    case '500':
      return 500
    default:
      return 200
  }
}

app.get('*', async function (req, res, next) {
  const memoryHistory = createMemoryHistory(req.originalUrl)
  let store
  try {
    store = await configureStore(memoryHistory)
  } catch(err) {
    next(err)
  }
  const history = syncHistoryWithStore(memoryHistory, store)
  const path = get(req, 'path' , '')
  const routes = createRoutes(history)

  if (path === `/${ACTIVATE_PAGE_PATH}`) {
    // The following procedure is for OAuth (Google/Facebook)
    // setup token to redux state from cookies
    const authInfoString = get(req, 'cookies.auth_info', '')
    const authType = get(req, 'query.login', 'email signin')
    if (authInfoString) {
      const authInfoObj = JSON.parse(authInfoString)
      const jwt = get(authInfoObj, 'jwt', '')
      if (jwt) {
        store.dispatch(authUserAction(authType, authInfoObj))
      }
    }
  }
  // setup authentication api server url and endpoints
  store.dispatch(configureAction(config.registrationConfigure))

  match({ history, routes, location: req.originalUrl }, (error, redirectLocation, renderProps) => {
    /*
      What's in renderProps: {
        matchContext,
        router,
        ...routerState
      } https://github.com/ReactTraining/react-router/blob/v3/docs/Glossary.md#routerstate
    */
    if (redirectLocation) {
      res.redirect(301, redirectLocation.pathname + redirectLocation.search)
    } else if (error) {
      throw new Error(error)
    } else if (!renderProps) {
      throw new NotFoundError()
    } else {
      const getReduxPromise = function () {
        const query = get(renderProps, 'location.query', {})
        const params = get(renderProps, 'params', {})
        const pathname = get(renderProps, 'location.pathname', '')

        let comp = renderProps.components[renderProps.components.length - 1]
        comp = comp.WrappedComponent || comp
        const promise = comp.fetchData ?
          comp.fetchData({ query, params, store, history, pathname }) :
          Promise.resolve()

        return promise
      }

      getReduxPromise().then(() => {
        const assets = __DEVELOPMENT__ ? {
          javascripts: {
            main: `${config.webpackPublicPath}${config.webpackOutputFilename}`,
            chunks: []
          },
          stylesheets: []
        } : require('../webpack-assets.json')
        const sheet = new ServerStyleSheet()
        const content = ReactDOMServer.renderToString(
          <Provider store={store} >
            <StyleSheetManager sheet={sheet.instance}>
              { <RouterContext {...renderProps} /> }
            </StyleSheetManager>
          </Provider>
          )

        // set Cache-Control header for caching
        if (!res.headersSent) {
          const pathname = get(renderProps, 'location.pathname', '')
          // set Cache-Control directive in response header
          for(const noCachePage of NO_CACHE_PAGES) {
            if (pathname.indexOf(noCachePage) > -1) {
              res.header('Cache-Control', 'no-store')
              break
            } else {
              res.header('Cache-Control', 'public, max-age=300')
            }
          }
        }

        const html = ReactDOMServer.renderToStaticMarkup(
            <Html
              content={content}
              store={store}
              assets={assets}
              styleElement={sheet.getStyleElement()}
            />
          )
        res.status(selectResponseStatus(get(renderProps, 'params.errorType')))
        res.send(`<!doctype html>${html}`)
      })
      .catch((err) => {
        next(err)
      })
    }
  })
})

//
// Error handling
//
const pe = new PrettyError()
pe.skipNodeFiles()
pe.skipPackage('express')

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.log(pe.render(err)) // eslint-disable-line no-console
  if (err instanceof NotFoundError || get(err, 'response.status') === 404) {
    res.redirect('/error/404')
  } else {
    res.redirect('/error/500')
  }
})

if (config.port) {
  server.listen(config.port, (err) => {
    if (err) {
      console.error(err)
    }
    console.info('==> 💻  Open http://%s:%s in a browser to view the app.', config.host, config.port)
  })
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified')
}

module.exports = server
