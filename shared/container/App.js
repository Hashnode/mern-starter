/* eslint no-unused-vars: 0 */
import React, { Component, PropTypes } from 'react';
import PostListView from '../container/PostListView/PostListView';
import PostCreateView from '../components/PostCreateView/PostCreateView';
import { connect } from 'react-redux';
import * as Actions from '../redux/actions/actions';

if (typeof window !== 'undefined') {
  require('./App.css');
}


class App extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { dispatch } = this.props;
    return (
      <div className="container">
        <PostCreateView addPost={function add(name, title, content) {
          dispatch(Actions.addPostRequest({ name, title, content }));
        }}
        />
      { this.props.children }
      </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  // posts: PropTypes.arrayOf(PropTypes.shape({
  //   name: PropTypes.string.isRequired,
  //   title: PropTypes.string.isRequired,
  //   content: PropTypes.string.isRequired,
  // })).isRequired,
  children: PropTypes.object.isRequired,
};

export default connect()(App);
