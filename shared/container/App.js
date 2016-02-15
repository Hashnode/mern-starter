/* eslint no-unused-vars: 0 */
import React, { Component, PropTypes } from 'react';
import PostListView from '../container/PostListView/PostListView';
import PostCreateView from '../components/PostCreateView/PostCreateView';
import { connect } from 'react-redux';
import * as Actions from '../redux/actions/actions';

class App extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { dispatch } = this.props;
    return (
      <div>
        { this.props.children }
      </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
};

export default connect()(App);
