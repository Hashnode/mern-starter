import React from 'react';
import PropTypes from 'prop-types';

// Import Components
import CommentListItem from './CommentListItem/CommentListItem';

function CommentList(props) {
  return (
    <div className="listView">
      {props.comments.map(comment => (
        <div>
          <CommentListItem
            comment={comment}
            key={comment.cuid}
            onUpdate={content => props.handleOnUpdate(comment.cuid, content)}
            onEdit={() => props.handleOnEdit(comment.cuid)}
            onDelete={() => props.handleDeleteComment(comment.cuid)}
          />
        </div>
      ))}
    </div>
  );
}

CommentList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      author: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      cuid: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleDeleteComment: PropTypes.func.isRequired,
};

export default CommentList;
