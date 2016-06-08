/**
 * Client entry point
 */
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './App';
import { configureStore } from './store';
import { browserHistory } from 'react-router';
import { match } from 'react-router';

// Import Routes
import routes from './routes';

// Initialize store
const store = configureStore(window.__INITIAL_STATE__);
const mountApp = document.getElementById('root');

match({ history: browserHistory, routes }, (error, redirectLocation, renderProps) => {
  render(
    <AppContainer>
      <App store={store} renderProps={renderProps} />
    </AppContainer>,
    mountApp
  );
});

// For hot reloading of react components
if (module.hot) {
  module.hot.accept('./App', () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.
    const NextApp = require('./App').default; // eslint-disable-line global-require
    match({ history: browserHistory, routes }, (error, redirectLocation, renderProps) => {
      render(
        <AppContainer>
          <NextApp store={store} renderProps={renderProps} />
        </AppContainer>,
        mountApp
      );
    })
  });
}
