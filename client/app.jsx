import React, { Component } from 'react';
import { render } from 'react-dom';

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <h1>Hello World!</h1>
    )
  }
}

render('app', <App />);

