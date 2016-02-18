import Hapi from "hapi";
import Inert from "inert";
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import Path from 'path';
// Initialize Hapi Server
const server = new Hapi.Server();

// Webpack Requirements @NOTE does nothing currently
import webpack from 'webpack';
import config from '../webpack.config.dev';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
// if (process.env.NODE_ENV !== 'production') {
//   const compiler = webpack(config);
//   app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
//   app.use(webpackHotMiddleware(compiler));
// }



// React And Redux Setup
import { configureStore } from '../shared/redux/store/configureStore';
import { Provider } from 'react-redux';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';

// Import required modules
import routes from '../shared/routes';
import { fetchComponentData } from './util/fetchData';
import posts from './routes/hapi.post.routes';
import dummyData from './dummyData';
import serverConfig from './config';

// MongoDB Connection
mongoose.connect(serverConfig.mongoURL, function (err, connection) {
  if (err) {
    throw err;
  }

  // feed some dummy data in DB.
  dummyData();
});

server.connection({
  port: 8000,
  routes: {
    files: {
      relativeTo: Path.resolve(__dirname, "../static")
    }
  }
});
const hapiOptions = {
  info: {
    "title": "Hapi-Mongo-React-Node",
    "version": "0.0.1"
  }
};
// Render Initial HTML
const renderFullPage = (html, initialState) => {
  const cssPath = process.env.NODE_ENV === 'production' ? '/css/app.min.css' : '/css/app.css';
  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>MERN Starter - Blog App</title>
        <link rel="stylesheet" href=${cssPath} />
        <link href='https://fonts.googleapis.com/css?family=Lato:400,300,700' rel='stylesheet' type='text/css'/>
        <link rel="shortcut icon" href="http://res.cloudinary.com/hashnode/image/upload/v1455629445/static_imgs/mern/mern-favicon-circle-fill.png" type="image/png" />
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
        </script>
        <script src="/dist/bundle.js"></script>
      </body>
    </html>
  `;
};
server.register([
  Inert
  // Vision,
  // Scooter,
  ], (err) => {
    if (err) {
      return console.error("PLUGIN REGISTER ERROR: \n", err, err.stack);
    }
  // Pass in routes
  server.route(posts);

  server.start((err) => {
    if (err) {
      throw (err);
    }

    console.log('Server started at: ' + server.info.uri, process.cwd());

  });
});
