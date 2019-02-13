import React from 'react';
import PropTypes from 'prop-types';
import Comment from '../Comment';

function CommentsList({ comments }) {
  return (
    <div className="comments">
      <ul className="comments-list">
        {
          comments.map(comment => (
            <li key={comment._id} className="list-item">
              <Comment comment={comment} />
            </li>)
          )
        }
      </ul>
    </div>
  );
}

CommentsList.propTypes = {
  comments: PropTypes.array.isRequired,
};

export default CommentsList;
