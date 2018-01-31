import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import SSRRoutes from '../shared/routes';
import store from '../shared/store';

const render = html => `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>MERN | Build awesome apps ... faster ⚡️</title>
        </head>
        <body>
            <div id="app">${html}</div>
            <script src="js/vendor.js"></script>
            <script src="js/app.js"></script>
        </body>
    </html>
`;

const serverSideRenderer = (request, response) => {
  const context = {};

  const appWithRouter = (
    <Provider store={store}>
      <StaticRouter location={request.url} context={context}>
        <SSRRoutes />
      </StaticRouter>
    </Provider>
  );

  if (context.url) {
    response.redirect(context.url);
    return;
  }

  const html = ReactDOMServer.renderToString(appWithRouter);

  response.status(200).send(render(html));
};

export default serverSideRenderer;
