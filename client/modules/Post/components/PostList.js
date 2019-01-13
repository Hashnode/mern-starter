import React from 'react';
import PropTypes from 'prop-types';

// Import Components
import PostListItem from './PostListItem/PostListItem';

function PostList(props) {
  const {
    posts,
    handleDeletePost,
    handleCreateComment,
    handleDeleteComment,
    handleEditComment,
    showAddComment,
    showEditComment,
  } = props;
  return (
    <div className="listView">
      {posts.map((post) => (
        <PostListItem
          post={post}
          comments={post.comments}
          key={post.cuid}
          onDelete={() => handleDeletePost(post.cuid)}
          onCreateComment={handleCreateComment}
          onEditComment={handleEditComment}
          onDeleteComment={handleDeleteComment}
          showAddComment={showAddComment}
          showEditComment={showEditComment}
        />
      ))}
    </div>
  );
}

PostList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      cuid: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleDeletePost: PropTypes.func.isRequired,
  handleCreateComment: PropTypes.func.isRequired,
  handleEditComment: PropTypes.func.isRequired,
  handleDeleteComment: PropTypes.func.isRequired,
  showAddComment: PropTypes.bool.isRequired,
  showEditComment: PropTypes.bool.isRequired,
};

export default PostList;

