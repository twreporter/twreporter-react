'use strict'

const isProduction = process.env.NODE_ENV === 'production'
const isServeSideRendering = process.env.RENDER_ENV === 'server'

const presets = [
  [
    'env',
    {
      targets: {
        node: 'current',
        browsers: ['last 2 versions'],
      },
      debug: isProduction,
      useBuiltIns: true,
    },
  ],
  require('babel-preset-react'),
  require('babel-preset-stage-0'),
]

const plugins = [
  'react-loadable/babel',
  isServeSideRendering ? 'dynamic-import-node' : 'syntax-dynamic-import',
  [
    'babel-plugin-styled-components',
    {
      ssr: true,
      displayName: !isProduction,
    },
  ],
  'babel-plugin-inline-import-data-uri',
  [
    'babel-plugin-inline-react-svg',
    {
      svgo: {
        plugins: [
          {
            cleanupIDs: false,
          },
        ],
      },
    },
  ],
].filter(Boolean)

module.exports = function buildTwreporterReactPreset() {
  return {
    presets,
    plugins,
  }
}
