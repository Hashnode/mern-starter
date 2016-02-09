var webpack = require('webpack');
var path = require('path');

module.exports = {
  devtool: 'eval-source-map', 

  entry: __dirname + "/client/index.js",

  output: {
    path: __dirname + '/dist/',
    filename: 'bundle.js',
    publicPath: '/dist/'
  },

  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style!css?modules'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}