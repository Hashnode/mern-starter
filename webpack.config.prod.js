var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ManifestPlugin = require('webpack-manifest-plugin');
var ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
var cssnext = require('postcss-cssnext');
var postcssFocus = require('postcss-focus');
var postcssReporter = require('postcss-reporter');
var cssnano = require('cssnano');

var cssloaders = [
  { loader: 'css-loader', 
    options: { localIdentName: '[hash:base64]', 
      modules: true, 
      importLoaders: 1, 
      sourceMap: true
    }
  },
  { loader: 'postcss-loader' }
]

module.exports = {
  devtool: 'hidden-source-map',

  entry: {
    app: [
      './client/index.js',
    ],
    vendor: [
      'react',
      'react-dom',
    ]
  },

  output: {
    path: __dirname + '/dist/',
    filename: '[name].[chunkhash].js',
    publicPath: '/',
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      'client',
      'node_modules',
    ],
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: cssloaders
        })
      }, {
        test: /\.css$/,
        include: /node_modules/,
        use: ['style-loader', 'css-loader'],
      }, {
        test: /\.jsx*$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      }, {
        test: /\.(jpe?g|gif|png|svg)$/i,
        use: 'url-loader?limit=10000',
      }, {
        test: /\.json$/,
        use: 'json-loader',
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      }
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        context  : __dirname,
        postcss: [
          postcssFocus(),
          cssnext({ browsers: ['last 2 versions', 'IE > 10'], }),
          cssnano({ autoprefixer: false }),
          postcssReporter({ clearMessages: true, })
        ]
      }
    }),    
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.js',
    }),
    new ExtractTextPlugin({ filename: 'app.[chunkhash].css', disable: false, allChunks: true }),
    new ManifestPlugin({
      basePath: '/',
    }),
    new ChunkManifestPlugin({
      filename: "chunk-manifest.json",
      manifestVariable: "webpackManifest",
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      }
    }),    
  ],
};
