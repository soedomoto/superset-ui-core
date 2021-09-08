const HtmlWebpackPlugin = require('html-webpack-plugin');
const DynamicCdnWebpackPlugin = require('dynamic-cdn-webpack-plugin');
const moduleToCdn = require('module-to-cdn');

module.exports = (env, argv) => {
  const mode = argv.mode ? argv.mode : "production";

  return {
    entry: './src/index.js',
    output: {
      libraryTarget: 'umd',
      globalObject: 'this',
      library: 'SupersetUiCore',
      filename: mode == 'development' ? 'index.js' : 'index.min.js',
    },
    module: {
      rules: [
        {
          test: /\.(png|jpe?g|gif)$/i,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          },
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader?presets=es2015',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ]
          }
        },
        { test: /\.css$/, loader: 'style-loader!css-loader' },
      ]
    },
    plugins: [
      new DynamicCdnWebpackPlugin({
        env: mode,
        resolver: (name, version, opts) => {
          return (({
            'lodash': {
              name: `lodash`,
              var: `_`,
              url: `https://cdn.jsdelivr.net/npm/lodash@${version}/lodash.min.js`,
              version
            },
            'lodash/camelCase': {
              name: `lodash/camelCase`,
              var: `_.camelCase`,
              url: `https://cdn.jsdelivr.net/npm/lodash@${version}/lodash.min.js`,
              version
            },
            'lodash/isPlainObject': {
              name: `lodash/isPlainObject`,
              var: `_.isPlainObject`,
              url: `https://cdn.jsdelivr.net/npm/lodash@${version}/lodash.min.js`,
              version
            },
            'lodash/mapKeys': {
              name: `lodash/mapKeys`,
              var: `_.mapKeys`,
              url: `https://cdn.jsdelivr.net/npm/lodash@${version}/lodash.min.js`,
              version
            },
            'lodash/isEmpty': {
              name: `lodash/isEmpty`,
              var: `_.isEmpty`,
              url: `https://cdn.jsdelivr.net/npm/lodash@${version}/lodash.min.js`,
              version
            },
            'lodash/isBoolean': {
              name: `lodash/isBoolean`,
              var: `_.isBoolean`,
              url: `https://cdn.jsdelivr.net/npm/lodash@${version}/lodash.min.js`,
              version
            },
            'd3-array': {
              name: 'd3-array',
              var: 'd3',
              url: `https://unpkg.com/d3-array@${version}/dist/d3-array.min.js`,
              version
            },
            'd3-color': {
              name: 'd3-color',
              var: 'd3',
              url: `https://unpkg.com/d3-color@${version}/dist/d3-color.min.js`,
              version
            },
            'd3-interpolate': {
              name: 'd3-interpolate',
              var: 'd3',
              url: `https://unpkg.com/d3-interpolate@${version}/dist/d3-interpolate.min.js`,
              version
            },
            'd3-format': {
              name: 'd3-format',
              var: 'd3',
              url: `https://unpkg.com/d3-format@${version}/dist/d3-format.min.js`,
              version
            },
            'd3-time': {
              name: 'd3-time',
              var: 'd3',
              url: `https://unpkg.com/d3-time@${version}/dist/d3-time.min.js`,
              version
            },
            'd3-time-format': {
              name: 'd3-time-format',
              var: 'd3',
              url: `https://unpkg.com/d3-time-format@${version}/dist/d3-time-format.min.js`,
              version
            },
            'd3-scale': {
              name: 'd3-scale',
              var: 'd3',
              url: `https://unpkg.com/d3-scale@${version}/dist/d3-scale.min.js`,
              version
            },
            'react-is': {
              name: 'react-is',
              var: 'ReactIs',
              url: `https://unpkg.com/react-is@${version}/umd/react-is.production.min.js`,
              version
            },
            '@emotion/react': {
              name: '@emotion/react',
              var: 'emotionReact',
              url: `https://unpkg.com/@emotion/react@${version}/dist/emotion-react.umd.min.js`,
              version
            },
            '@emotion/styled': {
              name: '@emotion/styled',
              var: 'emotionStyled',
              url: `https://unpkg.com/@emotion/styled@${version}/dist/emotion-styled.umd.min.js`,
              version
            },
            'rison': {
              name: 'rison',
              var: 'rison',
              url: `https://unpkg.com/rison@${version}/js/rison.js`,
              version
            },
            'stylis': {
              name: 'stylis',
              var: 'stylis',
              url: `https://unpkg.com/stylis@${version}/dist/umd/stylis.js`,
              version
            },
            'react-markdown': {
              name: 'react-markdown',
              var: 'ReactMarkdown',
              // url: `https://unpkg.com/react-markdown@${version}/react-markdown.min.js`,
              url: `https://unpkg.com/react-markdown@${version}/umd/react-markdown.js`,
              version
            },
            'whatwg-fetch': {
              name: 'whatwg-fetch',
              var: 'WHATWGFetch',
              url: `https://unpkg.com/whatwg-fetch@${version}/dist/fetch.umd.js`,
              version
            },
          })[name]) || moduleToCdn(name, version, opts)
        }
      }),
      new HtmlWebpackPlugin({
        minify: { collapseWhitespace: false, removeComments: true },
      }),
    ]
  };
}
