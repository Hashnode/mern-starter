import React from 'react';
import PropTypes from 'prop-types';

// Import Components
import CommentListItem from './CommentListItem/CommentListItem';

const CommentsList = props => {
  return (
    <div className="listView">
      {
        props.comments && props.comments.map(comment => (
          <CommentListItem
            comment={comment}
            key={comment._id}
            onDelete={id => props.handleDeleteComment(id)}
            handleEditComment={(id, content) => props.handleEditComment(id, content)}
          />
        ))
      }
    </div>
  );
};

CommentsList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({
    content: PropTypes.string.isRequired,
    createdBy: PropTypes.string.isRequired,
  })),
  handleDeleteComment: PropTypes.func.isRequired,
  handleEditComment: PropTypes.func.isRequired,
};

export default CommentsList;
