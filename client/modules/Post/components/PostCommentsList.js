import React from 'react';
import PropTypes from 'prop-types';

// Import Components
import PostCommentsListItem from './PostCommentsListItem/PostCommentsListItem';

function PostCommentsList(props) {
  return (
    <div>
      {props.comments.map(({ author, text, _id }) => (
        <PostCommentsListItem key={_id} comment_id={_id} author={author} text={text} />
      ))}
    </div>
  );
}

PostCommentsList.propTypes = {
  comments: PropTypes.array.isRequired,
};

export default PostCommentsList;
