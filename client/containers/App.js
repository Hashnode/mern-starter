import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import app from '../routes';
import store from '../store';

const App = () => (
  <Provider store={store}>
    <Router>
      {app()}
    </Router>
  </Provider>
);

export default App;
