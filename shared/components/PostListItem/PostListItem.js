/* eslint no-unused-vars: 0 */
/* eslint-disable prefer-template*/
import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

function PostListItem(props, context) {
  return (
     <div className="main">
      <Link to={'/post/' + props.post.title} onClick={props.onClick}>
        <h3 className="title">{props.post.title}</h3>
      </Link>
      <p className="subtitle name">- {props.post.name}</p>
      <p className="content">{props.post.content}</p>
     </div>
   );
}

PostListItem.propTypes = {
  post: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,

  onClick: PropTypes.func.isRequired,
};

export default PostListItem;
