import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './CommentListItem.css';

const CommentListItem = props => {
  const [isEdited, editComment] = useState(false);
  const [comment, changeValue] = useState(props.comment.content);

  const editCurrentComment = (id, content) => {
    props.handleEditComment(id, content);
    editComment(false);
  };

  const dateFormatted = `${props.comment.dateAdded.slice(11, 16)}  ${props.comment.dateAdded.slice(0, 10)}`;

  return (
    <div className={styles['single-comment']}>
      <div>
        <p className={styles['comment-date']}>{dateFormatted}</p>
        <p className={styles['author-name']}>By {props.comment.createdBy}</p>
      </div>
      {
        isEdited
          ? (
          <React.Fragment>
            <textarea
              className={styles['form-field']}
              value={comment}
              onChange={e => changeValue(e.target.value)}
            />
            <div className={styles['comment-actions']}>
              <a
                className={`${styles['comment-button']} ${styles['comment-cancel-button']}`}
                onClick={() => editComment(false)}
                href="#"
              >
                <FormattedMessage id="cancel" />
              </a>
              <a
                className={`${styles['comment-button']} ${styles['comment-submit-button']}`}
                onClick={() => editCurrentComment(props.comment._id, comment)}
                href="#"
              >
                <FormattedMessage id="submit" />
              </a>
            </div>
          </React.Fragment>
          )
        : (
          <React.Fragment>
            <p className={styles['comment-desc']}>{props.comment.content}</p>
            <div className={styles['comment-actions']}>
              <p className={`${styles['comment-action']} ${styles['comment-delete']}`}>
                <a href="#" onClick={() => props.onDelete(props.comment._id)}>
                  <FormattedMessage id="deleteComment" />
                </a>
              </p>
              <p className={`${styles['comment-action']} ${styles['comment-edit']}`}>
                <a href="#" onClick={() => editComment(true)}>
                  <FormattedMessage id="editComment" />
                </a>
              </p>
            </div>
          </React.Fragment>
          )
      }
    </div>
  );
};

CommentListItem.propTypes = {
  comment: PropTypes.shape({
    content: PropTypes.string.isRequired,
    createdBy: PropTypes.string.isRequired,
    dateAdded: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  handleEditComment: PropTypes.func.isRequired,
};

export default CommentListItem;
