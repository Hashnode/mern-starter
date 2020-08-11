import React from 'react';
import PropTypes from 'prop-types';

// Import Components
import CommentListItem from './CommentListItem/CommentListItem';

const CommentsList = props => {
  return (
    <div className="listView">
      {
        props.comments.map(comment => (
          <CommentListItem
            comment={comment}
            key={comment.postId}
            onDelete={() => {}}
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
  })).isRequired,
};

export default CommentsList;
