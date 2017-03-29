// React And Redux Setup
import {
  configureStore
} from '../../client/store';
import {
  Provider
} from 'react-redux';
import React from 'react';
import {
  renderToString
} from 'react-dom/server';
import {
  match,
  RouterContext
} from 'react-router';
import Helmet from 'react-helmet';
import { fetchComponentData } from '../util/fetchData';
import IntlWrapper from '../../client/modules/Intl/IntlWrapper';

// Express Routes
import routes from '../../client/routes';
import posts from '../routes/post.routes';
//Express Middleware
import Express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import path from 'path';

export default (app) => {
  // Apply body Parser and server public assets and routes
  app.use(compression());
  app.use(bodyParser.json({
    limit: '20mb'
  }));
  app.use(bodyParser.urlencoded({
    limit: '20mb',
    extended: false
  }));
  app.use(Express.static(path.resolve(__dirname, '../dist')));
  app.use('/api', posts);

  // Render Initial HTML
  const renderFullPage = (html, initialState) => {
    const head = Helmet.rewind();

    // Import Manifests
    const assetsManifest = process.env.webpackAssets && JSON.parse(process.env.webpackAssets);
    const chunkManifest = process.env.webpackChunkAssets && JSON.parse(process.env.webpackChunkAssets);

    return `
    <!doctype html>
    <html>
      <head>
        ${head.base.toString()}
        ${head.title.toString()}
        ${head.meta.toString()}
        ${head.link.toString()}
        ${head.script.toString()}

        ${process.env.NODE_ENV === 'production' ? `<link rel='stylesheet' href='${assetsManifest['/app.css']}' />` : ''}
        <link href='https://fonts.googleapis.com/css?family=Lato:400,300,700' rel='stylesheet' type='text/css'/>
        <link rel="shortcut icon" href="http://res.cloudinary.com/hashnode/image/upload/v1455629445/static_imgs/mern/mern-favicon-circle-fill.png" type="image/png" />
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
          ${process.env.NODE_ENV === 'production' ?
          `//<![CDATA[
          window.webpackManifest = ${JSON.stringify(chunkManifest)};
          //]]>` : ''}
        </script>
        <script src='${process.env.NODE_ENV === 'production' ? assetsManifest['/vendor.js'] : '/vendor.js'}'></script>
        <script src='${process.env.NODE_ENV === 'production' ? assetsManifest['/app.js'] : '/app.js'}'></script>
      </body>
    </html>
  `;
  };

  const renderError = err => {
    const softTab = '&#32;&#32;&#32;&#32;';
    const errTrace = process.env.NODE_ENV !== 'production' ?
      `:<br><br><pre style="color:red">${softTab}${err.stack.replace(/\n/g, `<br>${softTab}`)}</pre>` : '';
    return renderFullPage(`Server Error${errTrace}`, {});
  };

  // Server Side Rendering based on routes matched by React-router.
  app.use((req, res, next) => {
    match({
      routes,
      location: req.url
    }, (err, redirectLocation, renderProps) => {
      if (err) {
        return res.status(500).end(renderError(err));
      }

      if (redirectLocation) {
        return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      }

      if (!renderProps) {
        return next();
      }

      const store = configureStore();

      return fetchComponentData(store, renderProps.components, renderProps.params)
        .then(() => {
          const initialView = renderToString(<Provider store = {store} >
                <IntlWrapper >
                    <RouterContext { ...renderProps}/>  
                </IntlWrapper>  
            </Provider>);
          const finalState = store.getState();

          res
            .set('Content-Type', 'text/html')
            .status(200)
            .end(renderFullPage(initialView, finalState));
        })
        .catch((error) => next(error));
    });
  });

};
