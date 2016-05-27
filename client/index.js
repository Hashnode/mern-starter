import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';

import routes from './routes';
import { configureStore } from './store';

const store = configureStore(window.__INITIAL_STATE__);
const history = browserHistory;

render(
  <Provider store={store}>
    <Router history={history} routes={routes}/>
  </Provider>
  , document.getElementById('root')
);
