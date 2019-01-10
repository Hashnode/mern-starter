import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './CommentListItem.css';

function CommentListItem(props) {
  const date = new Date(props.comment.dateAdded);
  const dateString = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;

  return (
    <div className={styles.wrapper}>
      <div className={styles['info-bar']}>
        <h3>
          <FormattedMessage id="by" /> {props.comment.name}
        </h3>
        <div>{dateString}</div>
      </div>
      <p className={styles.content}>{props.comment.content}</p>
      <p>
        <button
          onClick={props.onEdit}
          data-cuid={props.comment.cuid}
          className={`${styles.button} ${styles['edit-button']}`}
        >
          <FormattedMessage id="editComment" />
        </button>
        <button
          onClick={props.onDelete}
          data-cuid={props.comment.cuid}
          className={`${styles.button} ${styles['delete-button']}`}
        >
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
