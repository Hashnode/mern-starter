import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../../actions/Post';
import Post from '../../components/Post';

class Feed extends Component {
  constructor() {
    super();

    this.state = {
      content: '',
      title: '',
    };

    this.content = this.content.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.addPost = this.addPost.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(actions.fetchAllPosts());
  }

  deletePost(slug) {
    this.props.dispatch(actions.deletePost(slug));
  }

  handleInput(event) {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  addPost() {
    const { title, content } = this.state;
    this.props.dispatch(actions.createPost(title, content));

    this.setState({
      title: '',
      content: '',
    });
  }

  content() {
    return (
      this.props.feed.isLoading
        ? (
          <p>Loading posts</p>
        )
        : (
          this.props.feed.posts.map(post => (
            <Post
              post={post}
              deleteHandler={this.deletePost}
              key={post._id}
            />
          ))
        )
    );
  }

  render() {
    return (
      <div>
        {
          this.content()
        }
        <div>
          <input
            type="text"
            value={this.state.title}
            name="title"
            placeholder="Enter Title"
            onChange={this.handleInput}
          />
          <textarea
            value={this.state.content}
            name="content"
            placeholder="Enter post"
            onChange={this.handleInput}
          />
          <button onClick={this.addPost}>
            Create Post
          </button>
        </div>
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
