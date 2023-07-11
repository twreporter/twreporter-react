'use strict'

const isProduction = process.env.NODE_ENV === 'production'
const isServeSideRendering = process.env.RENDER_ENV === 'server'

const presets = [
  [
    '@babel/preset-env',
    {
      targets: {
        node: 'current',
        browsers: ['last 2 versions'],
      },
      debug: isProduction,
      useBuiltIns: 'usage',
      corejs: {
        version: 3,
        proposals: true,
      },
    },
  ],
  require('@babel/preset-react'),
]

const plugins = [
  'react-loadable/babel',
  isServeSideRendering
    ? 'dynamic-import-node-babel-7'
    : '@babel/plugin-syntax-dynamic-import',
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
  '@babel/plugin-transform-runtime',
].filter(Boolean)

module.exports = function buildTwreporterReactPreset() {
  return {
    presets,
    plugins,
  }
}
