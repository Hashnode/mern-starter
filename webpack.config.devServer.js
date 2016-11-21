var fs = require('fs');
var path = require('path');
var StartServerPlugin = require("start-server-webpack-plugin").default;
var webpack = require("webpack");
var nodeExternals = require('webpack-node-externals');

var cssModulesIdentName = '[name]__[local]__[hash:base64:5]';
if (process.env.NODE_ENV === 'production') {
  cssModulesIdentName = '[hash:base64]';
}

module.exports = {
  devtool: 'inline-sourcemap',

  entry: {
    server: ['webpack/hot/poll?1000', './server/server.js']
  },

  externals: [nodeExternals({whitelist: [/^webpack\/hot/]})],

  resolve: {
    extensions: [
      '', '.js', '.jsx'
    ],
    modules: ['client', 'node_modules']
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          babelrc: false,
          cacheDirectory: true,
          presets: [
            [
              "es2015", {
                "modules": false
              }
            ],
            "react",
            "stage-0"
          ]
        }
      }, {
        test: /\.json$/,
        loader: 'json-loader'
      }, {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: 'universal-style-loader!css-loader?localIdentName=' + cssModulesIdentName
      }, {
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$/i,
        loader: 'url-loader'
      }
    ]
  },

  node: {
    __filename: true,
    __dirname: true
  },

  output: {
    chunkFilename: '[id].[hash:5]-[chunkhash:7].js',
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    path: './build/server'
  },

  plugins: [
    new StartServerPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoErrorsPlugin()
  ],

  target: 'async-node'
};
