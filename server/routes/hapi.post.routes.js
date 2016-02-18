// React And Redux Setup
import { configureStore } from '../../shared/redux/store/configureStore';
import { Provider } from 'react-redux';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';

//Required modules
import componentRoutes from '../../shared/routes';
import { fetchComponentData } from '../util/fetchData';
import posts from '../routes/hapi.post.routes';
import dummyData from '../dummyData';
import serverConfig from '../config';

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

const routes = [{
  path: "/static/{param*}",
  method: "GET",
  handler: {
    directory: {
      path: "."
    }
  }
}, {
  path: '/{param*}',
  method: 'GET',
  handler: (req, reply) => match({ routes: componentRoutes, location: req.url }, (err, redirectLocation, renderProps) => {
    if (err) {
      reply("500").statusCode = 500;
    }
    if (!renderProps) {
      reply("404").statusCode = 404;
    }
    console.log("RENDER PROPS", renderProps);
    const initialState = { posts: [], post: {} };

    const store = configureStore(initialState);

    fetchComponentData(store.dispatch, renderProps.components, renderProps.params)
      .then(() => {
        const initialView = renderToString(
          <Provider store={store}>
              <RouterContext {...renderProps} />
          </Provider>
        );
        const finalState = store.getState();

        reply(renderFullPage(initialView, finalState));
      })
      .catch(() => {
        reply(renderFullPage("Error", {}));
      });
  })
}, {
  path: "/getPosts",
  method: "GET",
  handler: (req, reply) => reply([])
}, {
  path: "/getPost",
  method: "GET",
  handler: (req, reply) => reply({})
}, {
  path: "/addPost",
  method: "POST",
  handler: (req, reply) => reply("Ok, I did nothing.")
}, {
  path: "/deletePost",
  method: "POST",
  handler: (req, reply) => reply("Ok, I did nothing.")
}]
module.exports = routes;
