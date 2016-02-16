/* eslint no-unused-vars: 0 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../redux/actions/actions';

class PostDetailView extends Component {

  constructor(props, context) {
    super(props, context);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      showAddPost: true,
    });
  }

  render() {
    return (
      <div>
        <div className="blog-header">
          <div className="top-bar">
            <h2 className="feed-title">MERN Blog</h2>
            <a className="add-post" onClick={this.handleClick}>Add Post</a>
          </div>
        </div>
        <div className="container">
          <div className="main">
            <h3 className="title">{this.props.post.title}</h3>
            <p className="subtitle name">{this.props.post.name}</p>
            <p className="content">{this.props.post.content}</p>
          </div>
        </div>
      </div>
      );
  }
}

PostDetailView.need = [function (params) {
  return Actions.getPostRequest.bind(null, params.title)();
}];

PostDetailView.propTypes = {
  post: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
  }).isRequired,
};

function mapStateToProps(store) {
  return {
    post: (store.post),
  };
}

export default connect(mapStateToProps)(PostDetailView);
