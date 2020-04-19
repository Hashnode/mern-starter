import React from 'react';
import PropTypes from 'prop-types';

import CommentListItem from '../CommentListItem/CommentListItem';

const CommentList = ({ comments, onEditComment, onDeleteComment }) => {
  return (
    <div>
      {comments.map(comment => <CommentListItem onDeleteComment={onDeleteComment} comment={comment} onEditComment={onEditComment} key={comment.cuid} />)}
    </div>
  );
};

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({
    author: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  })).isRequired,
  onEditComment: PropTypes.func.isRequired,
  onDeleteComment: PropTypes.func.isRequired,
};

export default CommentList;
