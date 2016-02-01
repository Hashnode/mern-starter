/* eslint no-unused-vars: 0 */
import React, { PropTypes, Component } from 'react';

function PostListItem(props, context) {
  return (
      <div>
        <p>{props.post.name}</p>
        <p>{props.post.title}</p>
        <p>{props.post.content}</p>
      </div>
    );
}

PostListItem.propTypes = {
  post: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
};

export default PostListItem;
