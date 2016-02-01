var webpack = require('webpack');
var path = require('path');

module.exports = {
  devtool: 'eval-source-map', 

  entry: __dirname + "/client/index.js",

  output: {
    path: __dirname + '/public/',
    filename: 'bundle.js',
    publicPath: '/'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.css$/,
        loader: 'style!css?modules'
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}