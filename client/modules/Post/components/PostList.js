import React from 'react';
import PropTypes from 'prop-types';

// Import Components
import PostListItem from './PostListItem/PostListItem';

function PostList(props) {
  return (
    <div className="listView">
      {
        props.posts.map(post => (
          <PostListItem
            post={post}
            key={post.cuid}
            onDelete={() => props.handleDeletePost(post.cuid)}
            handleAddComment={(authorName, content, id) => props.handleAddComment(authorName, content, id)}
            handleFetchComments={id => props.handleFetchComments(id)}
            comments={props.comments.filter(el => el.postId === post.cuid)}
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
  comments: PropTypes.arrayOf(PropTypes.shape({
    content: PropTypes.string.isRequired,
    createdBy: PropTypes.string.isRequired,
  })),
  handleDeletePost: PropTypes.func.isRequired,
  handleAddComment: PropTypes.func.isRequired,
  handleFetchComments: PropTypes.func.isRequired,
};

export default PostList;
