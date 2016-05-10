import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import styles from './App.css';
import cssModules from 'react-css-modules';

class App extends Component {
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

App.propTypes = {
  children: PropTypes.object.isRequired,
};

export default connect()(cssModules(App, styles));
