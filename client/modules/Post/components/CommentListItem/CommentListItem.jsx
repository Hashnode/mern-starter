import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './CommentListItem.css';

const CommentListItem = (props) => {
  return (
    <div className={styles['comment-item-container']}>
      <h4>Comment #1</h4>
      <p className={styles['author-name']}>
        <FormattedMessage id="by" />
        &nbsp;
        {props.comment.author}
      </p>
      <p className={styles['comment-content']}>{props.comment.content}</p>
      <p className={styles['comment-delete-button']}>&times;</p>
      <p className={styles['comment-edit-button']}>&#9998;</p>
    </div>
  );
};

CommentListItem.propTypes = {
  comment: PropTypes.shape({
    author: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
  // onDelete: PropTypes.func.isRequired,
};

export default CommentListItem;
