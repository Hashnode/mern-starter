const webpack = require('webpack');
const path = require('path');
const precss = require('precss');
const postcssImport = require('postcss-import');
const cssNext = require('postcss-cssnext');
const cssNested = require('postcss-nested');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const clientConfig = {
  context: path.resolve(__dirname, 'client'),

  devtool: 'eval-source-map',

  entry: {
    app: [
      'babel-polyfill',
      'react-hot-loader/patch',
      './app.jsx',
      'webpack-hot-middleware/client',
    ],
    vendor: ['react', 'react-dom', 'react-router-dom', 'react-router', 'redux', 'react-redux', 'axios'],
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'js/[name].js',
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIndentName: '[name]__[local]__[hash:base64:5]',
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [
                  precss,
                  postcssImport({
                    addDependencyTo: webpack,
                  }),
                  cssNext({
                    browsers: ['Chrome >= 31', 'Firefox >= 31', 'IE >= 9'],
                    url: false,
                  }),
                  cssNested,
                ],
              },
            },
          ],
        }),
      },
    ],
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
    }),
    new ExtractTextPlugin('css/app.css'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
};

const serverConfig = {
  context: path.resolve(__dirname, 'server'),

  devtool: 'eval-source-map',

  target: 'node',

  entry: {
    renderer: './renderer.jsx',
  },

  output: {
    path: path.resolve(__dirname, 'server'),
    publicPath: '/',
    filename: 'SSR.js',
    libraryTarget: 'commonjs2',
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIndentName: '[name]__[local]__[hash:base64:5]',
              emit: false,
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
};

if (process.env.NODE_ENV === 'inspect') {
  clientConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = [clientConfig, serverConfig];
