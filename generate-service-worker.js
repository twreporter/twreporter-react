import crypto from 'crypto'
import swPrecache from 'sw-precache'
import webpackAssets from './webpack-assets.json'
import packageJSON from './package.json'
import config from './config'

const apiURLPrefix = `${config.API_PROTOCOL}://${config.API_HOST}:${config.API_PORT}`
const buildDir = '.'
const swFilename = buildDir +  '/sw.js'

const hash = crypto.createHash('sha1')
  .update(JSON.stringify(webpackAssets))
  .digest('hex')

console.log(buildDir + webpackAssets.javascripts.main)

swPrecache.write(swFilename, {
  // Ensure all our bundels and assets are cached.
  staticFileGlobs: [
    buildDir + webpackAssets.javascripts.main,
    ...webpackAssets.javascripts.chunks.map((chunk) => {
      return buildDir + chunk
    }),
    ...webpackAssets.stylesheets.map((stylesheet) => {
      return buildDir + stylesheet
    }),
  ],

  // Define the dependencies for the server-rendered /sw-fallback-page URL,
  // so that it's kept up to date.
  dynamicUrlToDependencies: {
    '/sw-fallback-page': [
      buildDir + webpackAssets.javascripts.main,
      ...webpackAssets.stylesheets.map((stylesheet) => {
        return buildDir + stylesheet
      }),
    ],
  },

  // Brute force server worker routing:
  // Tell the service worker to use /sw-fallback-page for all navigations.
  // E.g. A request for /topics/not-in-cache-topic will be fulfilled with /sw-fallback-page
  navigateFallback: '/sw-fallback-page',

  // Various runtime caching strategies: sets up sw-toolbox handlers.
  runtimeCaching: [{
    urlPattern: new RegExp(apiURLPrefix + '/v1/posts'),
    handler: 'networkFirst',
    options: {
      cache: {
        name: 'posts-cache',
        maxEntries: 50,
      },
    },
  }, {
    urlPattern: new RegExp(apiURLPrefix + '/v1/topics'),
    handler: 'networkFirst',
    options: {
      cache: {
        name: 'topics-cache',
        maxEntries: 10,
      },
    },
  }, {
    urlPattern: new RegExp(apiURLPrefix + '/v1/index_page(_categories)?'),
    handler: 'networkFirst',
    options: {
      cache: {
        name: 'index-page-cache'
      },
    },
  }],

  stripPrefix: '.',
  cacheId: packageJSON.name + '-' + hash,
  verbose: true,
})
