import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import app from './routes';

const App = () => (
  <Router>
    { app() }
  </Router>
);

document.addEventListener('DOMContentLoaded', () => {
  render(<App />, document.getElementById('app'));
});

