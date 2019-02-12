import React from 'react';
import PropTypes from 'prop-types';

// Import Style
import styles from './CommentListItem.css';
import { CommentEditWidget } from '../CommentEditWidget/CommentEditWidget';

function CommentListItem(props) {
  return (
    <div className={styles['single-comment']}>
      <h3 className={styles['author-name']}>{props.comment.author}</h3>
      {props.comment.isEdit ? (
        <CommentEditWidget onUpdate={content => props.onUpdate(content)} comment={props.comment} />
      ) : (
        <div>
          <p className={styles['author-name']}>{props.comment.content}</p>
          <button className={styles['comment-edit-button']} onClick={props.onEdit}>Edit</button>
          <button className={styles['comment-delete-button']} onClick={props.onDelete}>Delete</button>
        </div>
      )}
    </div>
  );
}

CommentListItem.propTypes = {
  comment: PropTypes.shape({
    author: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    isEdit: PropTypes.bool.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default CommentListItem;
