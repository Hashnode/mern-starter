import React, { PropTypes } from 'react';
import PostListItem from './PostListItem';

function PostList(props) {
  return (
    <div className="listView">
      {
        props.posts.map((post, i) => (
          <PostListItem
            post={post}
            key={i}
            onClick={() => props.handleShowPost(post)}
            onDelete={() => props.handleDeletePost(post)}
          />
        ))
      }
    </div>
  );
}

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  })).isRequired,
  handleShowPost: PropTypes.func.isRequired,
  handleDeletePost: PropTypes.func.isRequired,
};

export default PostList;
