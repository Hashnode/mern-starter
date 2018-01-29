import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../../actions/Post';
import Post from '../../components/Post';

class Feed extends Component {
  constructor() {
    super();

    this.content = this.content.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(actions.fetchAllPosts());
  }

  content() {
    return (
      this.props.feed.isLoading
        ? (
          <p>Loading posts</p>
        )
        : (
          <div>
            {
              this.props.feed.posts.map(post => <Post post={post} />)
            }
          </div>
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

Feed.propTypes = {
  dispatch: PropTypes.func.isRequired,
  feed: PropTypes.shape({
    currentPost: PropTypes.object,
    posts: PropTypes.array,
    isLoading: PropTypes.bool,
    isError: PropTypes.bool,
  }).isRequired,
};

export default connect(mapStateToProps)(Feed);
