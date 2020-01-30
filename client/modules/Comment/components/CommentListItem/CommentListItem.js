import React from 'react';
import PropTypes from 'prop-types';

// Import style
import styles from './CommentListItem.css';
import CommentFormWidget from '../../CommentFormWidget/CommentFormWidget';
import { FormattedMessage } from 'react-intl';

const CommentListItem = ({ comment, onDelete }) => {
  const [isFormShown, toggleForm] = React.useState(false);

  return (
    <div className={styles.container} tabIndex={-10}>
      {
        !isFormShown
          ? <React.Fragment>
            <div className={styles.comment}>
              <div className={styles.content}>{comment.content}</div>
              <div className={styles.author}>{comment.author}</div>
            </div>
            <div className={styles.actions}>
              <button type="button" className={styles['action-btn']} onClick={() => onDelete(comment)}>
                <FormattedMessage id="deleteComment" />
              </button>
              <button type="button" className={styles['action-btn']} onClick={() => toggleForm(true)}>
                <FormattedMessage id="editComment" />
              </button>
            </div>
          </React.Fragment>
          : <CommentFormWidget
            inline
            onClose={() => toggleForm(false)}
            initialValues={comment}
          />
      }
    </div>
  );
};

CommentListItem.propTypes = {
  comment: PropTypes.shape({
    cuid: PropTypes.string,
    author: PropTypes.string,
    content: PropTypes.string,
  }),
  onDelete: PropTypes.func,
};

export default CommentListItem;
