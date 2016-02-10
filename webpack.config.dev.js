var webpack = require('webpack');
var path = require('path');

module.exports = {
  devtool: 'cheap-module-eval-source-map', 

  entry: ['webpack-hot-middleware/client',
          './client/index.js'
  ],

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
        loader: 'babel',
        query: {
          presets: ['react-hmre']
        }
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}