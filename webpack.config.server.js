var fs = require('fs');
var path = require('path');
var ExternalsPlugin = require('webpack-externals-plugin');

module.exports = {

  entry: path.resolve(__dirname, 'server/server.js'),

  output: {
    path: __dirname + '/dist/',
    filename: 'server.bundle.js',
  },

  target: 'node',

  node: {
    __filename: true,
    __dirname: true,
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
    modules: [
      'client',
      'node_modules',
    ],
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [
            'react',
            'es2015',
            'stage-0',
          ],
          plugins: [
            [
              'css-modules-transform', {
                generateScopedName: '[hash:base64]',
              }
            ]
          ]
        },
      }, {
        test: /\.json$/,
        loader: 'json-loader',
      }, {
        test: /\.css$/,
        loader: 'null-loader',
      }, {
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$/i,
        loader: 'fake-url-loader?limit=10000&name=assets/[name].[ext]',
      },
    ],
  },
  plugins: [
    new ExternalsPlugin({
      type: 'commonjs',
      include: path.join(__dirname, './node_modules/'),
    }),
  ],
};
