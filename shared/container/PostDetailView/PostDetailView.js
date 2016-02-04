/* eslint no-unused-vars: 0 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../redux/actions/actions';

class PostDetailView extends Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
        <div>
          <span>Name: {this.props.post.name}</span>
          <span>Title: {this.props.post.title}</span>
          <span>Content: {this.props.post.content}</span>
        </div>
      );
  }
}

PostDetailView.need = [function (params) {
  return Actions.changeSelectedPost.bind(null, params.title)();
}];

PostDetailView.propTypes = {
  post: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
};

function mapStateToProps(store) {
  return {
    post: (store.posts.filter((post) => post.title === store.selectedPost))[0],
  };
}

export default connect(mapStateToProps)(PostDetailView);
