import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Import Components
import PostListItem from './PostListItem/PostListItem';

const PostList = props => {
  const [openedCommentId, openComments] = useState(null);

  const showComments = id => {
    if (openedCommentId === id) {
      openComments(null);
    } else {
      props.handleFetchComments(id);
      openComments(id);
    }
  };

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
            comments={props.comments}
            showComments={id => showComments(id)}
            isCommentsOpened={post.cuid === openedCommentId}
            handleDeleteComment={id => props.handleDeleteComment(id)}
            handleEditComment={(id, content) => props.handleEditComment(id, content)}
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
  handleDeleteComment: PropTypes.func.isRequired,
  handleEditComment: PropTypes.func.isRequired,
};

export default PostList;
