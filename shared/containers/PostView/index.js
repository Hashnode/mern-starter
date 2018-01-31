import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../../actions/Post';
import Post from '../../components/Post';

class PostView extends Component {
  constructor() {
    super();

    this.content = this.content.bind(this);
    this.deletePost = this.deletePost.bind(this);
  }

  componentDidMount() {
    const { slug } = this.props.match.params;
    this.props.dispatch(actions.fetchSinglePost(slug));
  }

  deletePost(slug) {
    this.props.dispatch(actions.deletePost(slug));
  }

  content() {
    return (
      this.props.feed.isLoading
        ? (
          <p>Loading Post</p>
        )
        : (
          <Post
            post={this.props.feed.currentPost}
            key={this.props.feed.currentPost._id}
            deleteHandler={this.deletePost}
          />
        )
    );
  }

  render() {
    return (
      <div>
        {
          this.content()
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  feed: state.Post,
});

PostView.propTypes = {
  dispatch: PropTypes.func.isRequired,
  feed: PropTypes.shape({
    currentPost: PropTypes.object,
    posts: PropTypes.array,
    isLoading: PropTypes.bool,
    isError: PropTypes.bool,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.object,
    path: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
};

export default connect(mapStateToProps)(PostView);

