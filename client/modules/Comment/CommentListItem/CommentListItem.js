import React from 'react';
import PropTypes from 'prop-types';

// Import style
import styles from './CommentListItem.css';

const CommentListItem = ({ comment, onEdit, onDelete }) => (
  <div className={styles.container}>
    <div className={styles.comment}>
      <div className={styles.author}>{comment.author}</div>
      <div className={styles.content}>{comment.content}</div>
    </div>
    <div className="actions">
      <button type="button" className={styles.action} onClick={onEdit}>
        Edit
      </button>
      <button type="button" className={styles.action} onClick={onDelete}>
        Delete
      </button>
    </div>
  </div>
);

CommentListItem.propTypes = {
  comment: PropTypes.shape({
    cuid: PropTypes.string,
    author: PropTypes.string,
    content: PropTypes.string,
  }),
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default CommentListItem;
