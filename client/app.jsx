import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import app from './routes';
import store from './store';

const App = () => (
  <Provider store={store}>
    <Router>
      { app() }
    </Router>
  </Provider>
);

document.addEventListener('DOMContentLoaded', () => {
  render(<App />, document.getElementById('app'));
});

