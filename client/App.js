/**
 * Root Component
 */
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

// Base stylesheet
require('./main.css');

export default function App(props) {
  return (
    <Provider store={props.store}>
      <Router {...props.renderProps} />
    </Provider>
  );
}

App.propTypes = {
  store: React.PropTypes.object.isRequired,
  renderProps: React.PropTypes.object.isRequired,
};
