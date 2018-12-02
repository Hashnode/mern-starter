import React from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';

const CommentList = (props) => {
  const commentNodes = props.data.map(comment => (
    <Comment
      author={comment.author}
      key={comment._id}
      id={comment._id}
      timestamp={comment.updatedAt}
      handleUpdateComment={props.handleUpdateComment}
      handleDeleteComment={props.handleDeleteComment}
    >
      { comment.text}
    </Comment>
  ));
  return (
    <div>
      { commentNodes }
    </div>
  );
};

CommentList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    author: PropTypes.string,
    id: PropTypes.string,
    text: PropTypes.string,
    updatedAt: PropTypes.string,
  })),
  handleDeleteComment: PropTypes.func.isRequired,
  handleUpdateComment: PropTypes.func.isRequired,
};

CommentList.defaultProps = {
  data: [],
};

export default CommentList;