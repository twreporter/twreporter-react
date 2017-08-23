/*eslint no-console: 0*/
/*global __DEVELOPMENT__ webpackIsomorphicTools */
import 'babel-polyfill'
import Compression from 'compression'
import cookieParser from 'cookie-parser'
import DeviceProvider from '../src/components/DeviceProvider'
import Express from 'express'
import Helmet from 'react-helmet'
import Html from '../src/components/Html'
import PrettyError from 'pretty-error'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import config from './config'
import configureStore from '../src/store/configureStore'
import createLocation from 'history/lib/createLocation'
import createRoutes from '../src/routes/index'
import get from 'lodash/get'
import path from 'path'
import { configureAction, authUserAction, authInfoStringToObj } from 'twreporter-registration'
import { NotFoundError } from '../src/custom-error'
import { Provider } from 'react-redux'
import { RouterContext, match, createMemoryHistory } from 'react-router'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'

const server = new Express()
server.set('views', path.join(__dirname, 'views'))
server.set('view engine', 'ejs')
server.use(Compression())
server.use(cookieParser())

const oneDay = 86400000
server.use('/asset', Express.static(path.join(__dirname, '../static/asset'), { maxAge: oneDay * 7 }))
server.use('/dist', Express.static(path.join(__dirname, '../static/dist'), { maxAge: oneDay * 7 }))
server.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://www.twreporter.org/')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  next()
})


server.get('/robots.txt', (req, res) => {
  res.format({
    'text/plain': function () {
      res.status(200).render('robots')
    }
  })
})

server.get('/check', (req, res) => {
  res.status(200)
  res.end('server is running')
})

server.get('*', async function (req, res, next) {
  if (__DEVELOPMENT__) {
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    webpackIsomorphicTools.refresh()
  }
  let history = createMemoryHistory()
  let store = configureStore()

  let routes = createRoutes(history)

  let location = createLocation(req.url)

  // The following procedure is for OAuth (Google/Facebook)
  // setup token to redux state from cookies
  if (req.query.login && req.cookies) {
    const authType = req.query.login
    const authInfoString = req.cookies.auth_info
    const authInfoObj = authInfoStringToObj(authInfoString)
    store.dispatch(authUserAction(authType, authInfoObj))
  }
  // setup authentication api server url and endpoints
  const registrationConfigure = {
    apiUrl: 'http://localhost:8080',
    signUp: '/v1/signup',
    signIn: '/v1/login',
    activate: '/v1/activate',
    oAuthProviders: {
      google: '/v1/auth/google',
      facebook: '/v1/auth/facebook'
    },
    location: 'http://testtest.twreporter.org:3000',
    domain: 'twreporter.org'
  }
  store.dispatch(configureAction(registrationConfigure))
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
        if ( getCurrentUrl() === reqUrl ) {
          const assets = webpackIsomorphicTools.assets()
          const reduxState = escape(JSON.stringify(store.getState()))
          const script = assets.javascript
          const styles = assets.styles
          const sheet = new ServerStyleSheet()
          const children = ReactDOMServer.renderToString(
              <Provider store={store} >
                <DeviceProvider device={get(store.getState(), 'device')}>
                  <StyleSheetManager sheet={sheet.instance}>
                    { <RouterContext {...renderProps} /> }
                  </StyleSheetManager>
                </DeviceProvider>
              </Provider>
          )

          // rewinding is necessaray on the server:
          //  https://github.com/nfl/react-helmet#server-usage
          let head = Helmet.rewind()

          // set Cache-Control header for caching
          if (!res.headersSent) {
            res.header('Cache-Control', 'public, max-age=300')
          }

          const html = ReactDOMServer.renderToStaticMarkup(
            <Html
              children={children}
              reduxState={reduxState}
              styles={styles}
              styleTags={sheet.getStyleTags()}
              script={script}
              head={head}
            />
          )
          res.status(200)
          res.send(`<!doctype html>${html}`)
        } else {
          res.redirect(302, getCurrentUrl())
        }
        unsubscribe()
      }, (err) => {
        throw err
      }).catch((err) => {
        next(err)
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

//
// Error handling
//
const pe = new PrettyError()
pe.skipNodeFiles()
pe.skipPackage('express')

server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
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
