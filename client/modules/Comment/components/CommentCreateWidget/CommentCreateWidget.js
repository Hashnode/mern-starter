import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './CommentCreateWidget.css';

const CommentCreateWidget = ({ addComment, closeForm }) => {
  const [authorName, changeAuthor] = useState('');
  const [content, changeContent] = useState('');

  const addNewComment = () => {
    addComment(authorName, content);
    closeForm();
  };

  return (
    <div className={styles.form}>
      <div className={styles['form-content']}>
        <h2 className={styles['form-title']}><FormattedMessage id="createNewComment" /></h2>
        <input placeholder="Author Name" className={styles['form-field']} value={authorName} onChange={e => changeAuthor(e.target.value)} />
        <textarea placeholder="Content" className={`${styles['form-field']} ${styles['form-field-large']}`} value={content} onChange={e => changeContent(e.target.value)} />
        <div className={styles['comment-actions']}>
          <a
            className={`${styles['comment-button']} ${styles['comment-cancel-button']}`}
            href="#"
            onClick={() => closeForm()}
          >
            <FormattedMessage id="cancel" />
          </a>
          <a
            className={`${styles['comment-button']} ${styles['comment-submit-button']}`}
            href="#"
            onClick={() => addNewComment()}
          >
            <FormattedMessage id="submit" />
          </a>
        </div>
      </div>
    </div>
  );
};

CommentCreateWidget.propTypes = {
  addComment: PropTypes.func.isRequired,
  closeForm: PropTypes.func.isRequired,
};

export default CommentCreateWidget;
