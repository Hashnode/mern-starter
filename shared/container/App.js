import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

@connect()
export default class App extends Component {

  static propTypes = {
    children: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div>
        { this.props.children }
      </div>
    );
  }
}
