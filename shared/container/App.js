/* eslint no-unused-vars: 0 */
import React, { Component, PropTypes } from 'react';
import PostListView from '../components/PostListView/PostListView';
import PostCreateView from '../components/PostCreateView/PostCreateView';
import { connect } from 'react-redux';
import * as Actions from '../redux/actions/actions';

class App extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { dispatch, posts } = this.props;
    return (
      <div>
        <PostCreateView addPost={(name, title, content) =>
              dispatch(Actions.addPost(name, title, content)) }
        />
       <PostListView posts={posts} />
      </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  posts: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  })).isRequired,
};

function mapStateToProps(state) {
  return {
    posts: state.posts,
  };
}

export default connect(mapStateToProps)(App);
