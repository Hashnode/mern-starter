import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from '../shared/store';
import App from '../shared/routes';

const render = (Component) => {
  ReactDOM.hydrate(
    <AppContainer>
      <Provider store={store}>
        <BrowserRouter>
          <Component />
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    document.getElementById('app'),
  );
};

document.addEventListener('DOMContentLoaded', () => {
  render(App);
});

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('../shared/routes', () => {
    const NextApp = require('../shared/routes').default; // eslint-disable-line
    render(NextApp);
  });
}
