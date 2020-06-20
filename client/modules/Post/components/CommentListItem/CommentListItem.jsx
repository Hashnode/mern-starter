import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './CommentListItem.css';

const CommentListItem = (props) => {
  const [edit, setEdit] = useState(false);

  return (
    <div className={styles['comment-item-container']}>
      {
        !edit ?
          <div>
            <h4>Comment #1</h4>
            <p className={styles['author-name']}>
              <FormattedMessage id="by" />
              &nbsp;
              {props.comment.author}
            </p>
            <p className={styles['comment-content']}>{props.comment.content}</p>
            <p className={styles['comment-delete-button']}>&times;</p>
            <p onClick={() => setEdit(true)} className={styles['comment-edit-button']}>&#9998;</p>
          </div> :
          <div>
            <h4>Comment #1</h4>
            <input value={props.comment.author} className={styles['edit-form-field']} />
            <textarea value={props.comment.content} className={styles['edit-form-field']} />
            <button onClick={() => setEdit(false)} className={styles['edit-button']}>Save</button>
            <button onClick={() => setEdit(false)} className={styles['edit-button']}>Cancel</button>
          </div>
      }
    </div>
  );
};

CommentListItem.propTypes = {
  comment: PropTypes.shape({
    author: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
  // onDelete: PropTypes.func.isRequired,
};

export default CommentListItem;
