/* eslint no-unused-vars:0 */
import React, { PropTypes } from 'react';
import PostListItem from '../PostListItem/PostListItem';

function PostListView(props, context) {
  return <div> {props.posts.map((post, i, arr) => <PostListItem post={post} key={i} />) }</div>;
}

PostListView.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  })).isRequired,
};

export default PostListView;
