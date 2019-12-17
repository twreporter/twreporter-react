import config from '../config'
import crypto from 'crypto'
import externalFunctions from './functions'
import fs from 'fs'
import path from 'path'
import requestOrigins from '@twreporter/core/lib/constants/request-origins'
import template from 'lodash/template'
import url from 'url'
import util from 'util'
import webpackAssets from '../webpack-assets.json'

function generateRuntimeCaching(runtimeCaching) {
  return runtimeCaching.reduce(function (prev, curr) {
    let line
    if (curr.default) {
      line = util.format('\ntoolbox.router.default = toolbox.%s;',
        curr.default)
    } else {
      let urlPattern = curr.urlPattern
      if (typeof urlPattern === 'string') {
        urlPattern = JSON.stringify(urlPattern)
      }

      if (!(urlPattern instanceof RegExp ||
            typeof urlPattern === 'string')) {
        throw new Error(
          'runtimeCaching.urlPattern must be a string or RegExp')
      }

      line = util.format('\ntoolbox.router.%s(%s, %s, %s);',
        // Default to setting up a 'get' handler.
        curr.method || 'get',
        // urlPattern might be a String or a RegExp. sw-toolbox supports both.
        urlPattern,
        // If curr.handler is a string, then assume it's the name of one
        // of the built-in sw-toolbox strategies.
        // E.g. 'networkFirst' -> toolbox.networkFirst
        // If curr.handler is something else (like a function), then just
        // include its body inline.
        (typeof curr.handler === 'string' ? 'toolbox.' : '') + curr.handler,
        // Default to no options.
        JSON.stringify(curr.options),
      )
    }

    return prev + line
  }, '')
}

const releaseBranch = config.releaseBranch
const origin = url.parse(requestOrigins.forClientSideRendering[releaseBranch].api)

const apiURLPrefix = `${origin.protocol}://${origin.hostname}(:${config.port})?`
const hash = crypto.createHash('sha1').update(JSON.stringify(webpackAssets)).digest('hex')
const cacheName = 'sw-precache-twreporter-' + hash
const staticFilesToCache = [
  webpackAssets.javascripts.main,
  webpackAssets.javascripts.manifest,
  ...webpackAssets.javascripts.vendors,
  ...webpackAssets.javascripts.chunks,
  ...webpackAssets.stylesheets,
  '/',
  '/sw-fallback-page'
]
const swFilePath = path.resolve(__dirname, '../sw.js')
const swTemplatePath = './service-worker.tmpl'

const fallback = '/sw-fallback-page'
const pagePatternToCache = [ /^\/(a|topics|tags|category|categories)\//, /^\/$/, /^\/photography/ ]

const tmpl = fs.readFileSync(path.resolve(__dirname, swTemplatePath), 'utf8')
const swToolBoxCode = fs.readFileSync(require.resolve('sw-toolbox/sw-toolbox.js'), 'utf8')
  .replace('//# sourceMappingURL=sw-toolbox.js.map', '')
const param = {
  cacheName,
  staticFilesToCache: JSON.stringify(staticFilesToCache),
  fallbackPage: fallback,
  pagePatternToCache: JSON.stringify(pagePatternToCache.map((regex) => {
    return regex.source
  })),
  externalFunctions,
  swToolBoxCode: swToolBoxCode,
  runtimeCaching: generateRuntimeCaching([ {
    urlPattern: new RegExp(apiURLPrefix + '/v1/posts'),
    handler: 'networkFirst',
    options: {
      cache: {
        name: 'posts-cache',
        maxEntries: 50
      }
    }
  }, {
    urlPattern: new RegExp(apiURLPrefix + '/v1/topics'),
    handler: 'networkFirst',
    options: {
      cache: {
        name: 'topics-cache',
        maxEntries: 10
      }
    }
  }, {
    urlPattern: new RegExp(apiURLPrefix + '/v1/index_page(_categories)?'),
    handler: 'networkFirst',
    options: {
      cache: {
        name: 'index-page-cache'
      }
    }
  } ])
}

const populatedTmpl = template(tmpl)(param)

fs.writeFileSync(swFilePath, populatedTmpl)
