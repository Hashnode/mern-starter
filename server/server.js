import Express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';

// Webpack Requirements
import webpack from 'webpack';
import config from '../webpack.config.dev';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

// Initialize the Express App
const app = new Express();

console.log(process.env.NODE_ENV);

if(process.env.NODE_ENV !== 'production'){
  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

app.use('/', Express.static(__dirname + '../static'));


// React And Redux Setup
import { configureStore } from '../shared/redux/store/configureStore';
import { Provider } from 'react-redux';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';

// Import required modules
import routes from '../shared/routes';
import { fetchComponentDataBeforeRender } from './lib/fetchData';
const Post = require('./models/post');

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/mern-starter');

// Apply Body Parser and server public assets
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
app.use(Express.static(path.resolve(__dirname, '../static')));

/* *************
API EndPoints
**************** */

/* Add a new Post
  @body post
*/
app.post('/api/addPost', (req, res) => {
  const newPost = new Post(req.body.post);
  newPost.save((err, saved) => {
    return res.json({ post: saved });
  });
});

/* Get all Posts */
app.get('/api/getPosts', (req, res) => {
  Post.find().exec((err, posts) => {
    res.json({ posts });
  });
});

/* Add a new Post
  @query title
*/
app.get('/api/getPost', (req, res) => {
  Post.findOne({ title: req.query.title }).exec((err, post) => {
    res.json({ post });
  });
});

// Render Initial HTML
const renderFullPage = (html, initialState) => {
  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <link rel="stylesheet" href="/css/app.css" type="text/css" />
        <title>Isomorphic Redux Example</title>
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

// Server Side Rendering based on routes matched by React-router.
app.use((req, res) => {
  match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
    if (err) {
      return res.status(500).end('Internal server error');
    }

    if (!renderProps) {
      return res.status(404).end('Not found!');
    }

    const initialState = { posts: [], post: {} };

    const store = configureStore(initialState);

    fetchComponentDataBeforeRender(store.dispatch, renderProps.components, renderProps.params)
      .then(() => {
        const initialView = renderToString(
          <Provider store={store}>
              <RouterContext {...renderProps} />
          </Provider>
        );
        const finalState = store.getState();
        res.status(200).end(renderFullPage(initialView, finalState));
      })
      .catch(() => {
        res.end(renderFullPage('Error', {}));
      });
  });
});

// start app
app.listen(8000, (error) => {
  console.log(error);
});
