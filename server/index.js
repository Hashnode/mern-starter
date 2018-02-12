/* eslint no-console: 0 */

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

// Local Imports
const serverConfig = require('./config');
const routes = require('./routes');
const dummyData = require('./dummyData');
const webpackConfig = require('../webpack.config.dev')[0];
const SSR = require('./SSR');

// Initialize Express App
const app = express();

// Set environment flags
const isTest = serverConfig.nodeEnv === 'test';
const isDev = serverConfig.nodeEnv === 'development';

// HMR Stuff
if (isDev) {
  const middlewareOptions = {
    stats: { colors: true },
    noInfo: false,
    lazy: false,
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost',
    },
    publicPath: webpackConfig.output.publicPath,
  };

  const compiler = webpack(webpackConfig);
  const webpackDevMiddlewareInstance = webpackDevMiddleware(compiler, middlewareOptions);
  app.use(webpackDevMiddlewareInstance);
  app.use(webpackHotMiddleware(compiler));
}


// Set native promises as mongoose promise
mongoose.Promise = global.Promise;

// MongoDB Connection
mongoose.connect(isTest ? serverConfig.testMongoURL : serverConfig.mongoURL, (error) => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!');
    throw error;
  } else {
    console.log(`Connected to DB at ${isTest ? serverConfig.testMongoURL : serverConfig.mongoURL}`);
  }

  // feed some dummy data in DB.
  dummyData();
});

// Apply body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// server public assets and routes
app.use(express.static(path.resolve(__dirname, '..', 'dist')));

app.use('/api', routes.posts);

app.get('*', SSR.default);

if (!isTest) {
  // Testing does not require you to listen on a port
  app.listen(serverConfig.port, (error) => {
    if (!error) {
      console.log(`MERN is running on port: ${serverConfig.port}! Build something amazing!`);
    }
  });
}

module.exports = app;
