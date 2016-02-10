/* eslint no-unused-vars: 0 */
import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

function PostListItem(props, context) {
  return (
     <div className="main">
       <span className="name">Name: {props.post.name}</span>
       <Link to={'/post/'+props.post.title} onClick={props.onClick}>
         <span className="title">Title: {props.post.title}</span></Link>
       <span className="content">Content: {props.post.content}</span>
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
