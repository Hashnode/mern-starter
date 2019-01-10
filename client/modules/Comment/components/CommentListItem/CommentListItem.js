import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './CommentListItem.css';

function CommentListItem(props) {
  return (
    <div className={styles['single-comment']}>
      <h3 className={styles['comment-title']}>
        {props.comment.name}
      </h3>
      <p className={styles['comment-desc']}>{props.comment.content}</p>
      <p className={styles['comment-action']}>
        <button onClick={props.onEdit} data-cuid={comment.cuid}>
          <FormattedMessage id="editComment" />
        </button>
        <button onClick={props.onDelete} data-cuid={comment.cuid}>
          <FormattedMessage id="deleteComment" />
        </button>
      </p>
      <hr className={styles.divider} />
    </div>
  );
}

CommentListItem.propTypes = {
  comment: PropTypes.shape({
    name: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    postCuid: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
    dateAdded: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default CommentListItem;
