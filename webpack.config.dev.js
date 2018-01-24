const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const config = {
  context: path.resolve(__dirname, 'client'),

  devtool: 'eval-source-map',

  entry: {
    app: './app.jsx',
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
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'MERN | Build amazing things ... faster',
      template: './index.html',
    }),
  ],
};

module.exports = config;
