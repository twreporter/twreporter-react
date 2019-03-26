'use strict'

const isProduction = process.env.NODE_ENV === 'production'
const isServeSideRendering = process.env.RENDER_ENV === 'server'

const presets = [
  require('babel-preset-es2015'),
  require('babel-preset-react'),
  require('babel-preset-stage-0')
]

const plugins = [
  'react-loadable/babel',
  isServeSideRendering ? 'dynamic-import-node' : 'syntax-dynamic-import',
  [ 'babel-plugin-styled-components', {
    ssr: true,
    displayName: !isProduction
  } ],
  'babel-plugin-inline-import-data-uri',
  [ 'babel-plugin-inline-react-svg', {
    svgo: {
      plugins: [ {
        cleanupIDs: false
      } ]
    }
  } ],
  isServeSideRendering ? [ 'babel-plugin-css-modules-transform', {
    extensions: [ '.css', '.scss' ],
    generateScopedName: '[name]__[local]___[hash:base64:5]'
  } ] : null
].filter(Boolean)

module.exports = function buildTwreporterReactPreset() {
  return {
    presets,
    plugins
  }
}
