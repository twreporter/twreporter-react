/*eslint no-console: 0*/
/*global __DEVELOPMENT__ webpackIsomorphicTools */
import 'babel-polyfill'
import Compression from 'compression'
import cookieParser from 'cookie-parser'
import DeviceProvider from '../src/components/DeviceProvider'
import Express from 'express'
import Html from '../src/helpers/Html'
import PrettyError from 'pretty-error'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import config from './config'
import configureStore from '../src/store/configureStore'
import createRoutes from '../src/routes/index'
import get from 'lodash/get'
import http from 'http'
import path from 'path'
import { ACTIVATE_PAGE_PATH } from './routes/index'
import { configureAction, authUserAction, authInfoStringToObj } from '@twreporter/registration'
import { NotFoundError } from '../src/custom-error'
import { Provider } from 'react-redux'
import { RouterContext, match, createMemoryHistory } from 'react-router'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'
import { syncHistoryWithStore } from 'react-router-redux'


const app = new Express()
const server = new http.Server(app)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(Compression())
app.use(cookieParser())

const oneDay = 86400000
app.use('/asset', Express.static(path.join(__dirname, '../static/asset'), { maxAge: oneDay * 7 }))
app.use('/dist', Express.static(path.join(__dirname, '../static/dist'), { maxAge: oneDay * 30 }))
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://www.twreporter.org/')
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

app.get('*', async function (req, res, next) {
  if (__DEVELOPMENT__) {
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    webpackIsomorphicTools.refresh()
  }
  const memoryHistory = createMemoryHistory(req.originalUrl)
  const store = configureStore(memoryHistory)
  const history = syncHistoryWithStore(memoryHistory, store)
  let routes = createRoutes(history)

  const path = get(req, 'path' , '')
  if (path === `/${ACTIVATE_PAGE_PATH}`) {
    // The following procedure is for OAuth (Google/Facebook)
    // setup token to redux state from cookies
    const authInfoString = get(req, 'cookies.auth_info', '')
    const authType = get(req, 'query.login', 'email signin')
    if (authInfoString) {
      const authInfoObj = authInfoStringToObj(authInfoString)
      const jwt = get(authInfoObj, 'jwt', '')
      if (jwt) {
        store.dispatch(authUserAction(authType, authInfoObj))
      }
    }
  }
  // setup authentication api server url and endpoints
  store.dispatch(configureAction(config.registrationConfigure))
  match({ history, routes, location: req.originalUrl }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(301, redirectLocation.pathname + redirectLocation.search)
    } else if (error) {
      res.status(500).render('500', error)
    } else if (renderProps == null) {
      res.status(404).render('404')
    } else {
      store.dispatch({
        type: 'DETECT_DEVICE',
        headers: get(req, [ 'headers', 'user-agent' ])
      })

      const getReduxPromise = function () {
        const query = get(renderProps, 'location.query', {})
        const params = get(renderProps, 'params', {})
        let comp = renderProps.components[renderProps.components.length - 1]
        comp = comp.WrappedComponent || comp
        const promise = comp.fetchData ?
          comp.fetchData({ query, params, store, history }) :
          Promise.resolve()

        return promise
      }

      getReduxPromise().then(()=> {
        const assets = webpackIsomorphicTools.assets()
        const sheet = new ServerStyleSheet()
        const content = ReactDOMServer.renderToString(
            <Provider store={store} >
              <DeviceProvider device={get(store.getState(), 'device')}>
                <StyleSheetManager sheet={sheet.instance}>
                  { <RouterContext {...renderProps} /> }
                </StyleSheetManager>
              </DeviceProvider>
            </Provider>
          )

        // set Cache-Control header for caching
        if (!res.headersSent) {
          res.header('Cache-Control', 'public, max-age=300')
        }

        const html = ReactDOMServer.renderToStaticMarkup(
            <Html
              content={content}
              store={store}
              assets={assets}
              styleTags={sheet.getStyleTags()}
            />
          )
        res.status(200)
        res.send(`<!doctype html>${html}`)
      }, (err) => {
        throw err
      }).catch((err) => {
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
    res.status(404)
    res.render('404')
    return
  }
  res.status(500)
  let errStack = err.stack.split('\n')
  res.render('500', { error: errStack })
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
