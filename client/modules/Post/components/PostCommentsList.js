import React from 'react';
import PropTypes from 'prop-types';

// Import Components
import PostCommentsListItem from './PostCommentsListItem/PostCommentsListItem';

function PostCommentsList(props) {
  return (
    <div>
      {
        props.comments.map( ({author, comment}) => (
          <PostCommentsListItem author={author} comment={comment} />
        ))
      }
    </div>
  );
}

PostCommentsList.propTypes = {
};

export default PostCommentsList;
