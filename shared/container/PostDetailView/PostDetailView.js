/* eslint no-unused-vars: 0 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

function PostDetailView(props, context) {
  return (
      <div>
        <span>Name: {props.post.name}</span>
        <span>Title: {props.post.title}</span>
        <span>Content: {props.post.content}</span>
      </div>
    );
}

PostDetailView.propTypes = {
  post: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
};

function mapStateToProps(store) {
  console.log(store);
  return {
    post: (store.posts.filter((post) => post.title === store.selectedPost))[0],
  };
}

export default connect(mapStateToProps)(PostDetailView);
