/*eslint no-console: 0*/
import 'babel-polyfill'
import Compression from 'compression'
import Express from 'express'
import PrettyError from 'pretty-error'
import authMiddleware from './middlewares/auth'
import cookieParser from 'cookie-parser'
import dataLoaderMiddleware from './middlewares/data-loader'
import get from 'lodash/get'
import http from 'http'
import initReduxStoreMiddleware from './middlewares/init-redux-store'
import path from 'path'
import renderHTMLMiddleware from './middlewares/render-html'
import { NotFoundError } from '../custom-error'

const _ = {
  get
}

class ExpressServer {
  constructor() {
    this.app = new Express()
    this.server = new http.Server(this.app)
  }

  /**
   *  @param {string} cookieSecret - secret for cookie parser
   */
  __applyDefaultMiddlewares(cookieSecret) {
    this.app.use(Compression())
    this.app.use(cookieParser(cookieSecret))
  }

  __applyStaticRoutes() {
    const oneDay = 86400000
    this.app.use('/asset', Express.static(path.join(__dirname, '../../static/asset'), { maxAge: oneDay * 7 }))
    this.app.use('/dist', Express.static(path.join(__dirname, '../../dist'), { maxAge: oneDay * 30 }))
    this.app.use('/meta', Express.static(path.join(__dirname, '../../static/meta'), { maxAge: oneDay }))
  }

  __applyServiceWorkerRoutes() {
    this.app.get('/sw.js', function (req, res, next) {
      const options = {
        headers:{
          'Cache-Control': 'public, max-age=900, must-revalidate'
        },
        root: path.resolve(__dirname, '../../')
      }

      res.sendFile('sw.js', options, function (err) {
        if (err) {
          next(err)
        }
      })
    })
  }

  __applySearchEngineRoutes() {
    this.app.get('/BingSiteAuth.xml', function (req, res, next) {
      const options = {
        headers: {
          'Cache-Control': 'public, max-age=2419200, must-revalidate'
        },
        root: path.resolve(__dirname, '../../static/')
      }

      res.sendFile('BingSiteAuth.xml', options, function (err) {
        if (err) {
          next(err)
        }
      })
    })

    this.app.get('/robots.txt', (req, res) => {
      res.format({
        'text/plain': function () {
          res.status(200).send('User-agent: * \n' +
            'Sitemap: https://www.twreporter.org/sitemaps/twreporter-sitemap.xml\n' +
            'Sitemap: https://www.twreporter.org/sitemaps/index-articles.xml'
          )
        }
      })
    })
  }

  __applyResponseHeader() {
    this.app.use(function (req, res, next) {
      res.header('Access-Control-Allow-Origin', 'https://www.twreporter.org/')
      res.header('Access-Control-Allow-Headers', 'X-Requested-With')
      next()
    })
  }

  __applyHealthCheckRoutes() {
    this.app.get('/check', (req, res) => {
      res.status(200)
      res.end('server is running')
    })

  }

  /**
   *  @param {Object} webpackAssets - it lists all the built webpack bundles we are going to use
   *  @param {Object} loadableStats - it presnets files, modules and webpack bundles relationship
   *  @param {Object} options
   *  @param {string} options.releaseBranch - release branch, it could be 'master', 'test', 'staging' or 'release'
   *  @param {string} options.nodeEnv - node environment, it could be 'development' or 'production'
   */
  __applyAppRoutes(webpackAssets, loadableStats, options) {
    const namespace = 'twreporter'

    // NOTICE:
    // the order of middlewares matters
    this.app.get('*', [
      (req, res, next) => {
        /**
         *  typedef middlewareContext
         *  @property {Object} middlewareContext.reduxStore - redux store instance
         *  @property {Object} middlewareContext.routerStaticContext - context of `StaticRouter` component
         *  @property {string} middlewareContext.html - html static markup
         */
        const middlewareContext = {
          reduxStore: null,
          routerStaticContext: null,
          html: ''
        }
        req[namespace] = middlewareContext
        next()
      },
      initReduxStoreMiddleware(namespace),
      authMiddleware(namespace, options),
      dataLoaderMiddleware(namespace),
      renderHTMLMiddleware(namespace, webpackAssets, loadableStats, options),
      (req, res) => {
        const statusOK = 200
        const statusRedirect = 301
        const { html, routerStaticContext } = req[namespace]

        if ( routerStaticContext.url ) {
          // somewhere a `<Redirect>` was rendered
          res.redirect(statusRedirect, routerStaticContext.url)
          return
        }

        const statusCode = _.get(routerStaticContext, 'statusCode', statusOK)
        if (!res.headersSent && statusCode < statusRedirect ) {
          const idToken = _.get(req, 'cookies.id_token')
          if (idToken) {
            // not to cache personal response
            res.header('Cache-Control', 'no-store')
          } else {
            // set Cache-Control header for caching
            res.header('Cache-Control', 'public, max-age=300')
          }
        }

        res.status(statusCode)
        res.send(html)
      }
    ])
  }

  __applyCustomErrorHandler() {
    const pe = new PrettyError()
    pe.skipNodeFiles()
    pe.skipPackage('express')

    this.app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
      if (res.headersSent) {
        return next(err)
      }

      console.log(pe.render(err)) // eslint-disable-line no-console
      res.header('Cache-Control', 'no-store')
      if (err instanceof NotFoundError || _.get(err, 'response.status') === 404) {
        res.redirect('/error/404')
      } else {
        res.redirect('/error/500')
      }
    })
  }

  /**
   *  @param {Object} webpackAssets - it lists all the built webpack bundles we are going to use
   *  @param {Object} loadableStats - it presnets files, modules and webpack bundles relationship
   *  @param {Object} options
   *  @param {string} options.releaseBranch - release branch, it could be 'master', 'test', 'staging' or 'release'
   *  @param {string} options.nodeEnv - node environment, it could be 'development' or 'production'
   *  @param {string} options.cookieSecret - secret for cookie parser
   */
  setup(webpackAssets, loadableStats, options) {
    this.__applyDefaultMiddlewares(options.cookieSecret)
    this.__applyStaticRoutes()
    this.__applyResponseHeader()
    this.__applyServiceWorkerRoutes()
    this.__applySearchEngineRoutes()
    this.__applyHealthCheckRoutes()
    this.__applyAppRoutes(webpackAssets, loadableStats, options)
    this.__applyCustomErrorHandler()
  }

  /**
   *  @param {string} host - host of server
   *  @param {string|number} port - port server listens to
   */
  run(host, port) {
    if (port) {
      this.server.listen(port, (err) => {
        if (err) {
          console.error(err)
        }
        console.info('==> 💻  Open http://%s:%s in a browser to view the app.', host, port)
      })
    } else {
      console.error('==>     ERROR: No PORT environment variable has been specified')
    }
  }
}

module.exports = ExpressServer
