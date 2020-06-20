import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

// Import Style
import styles from './AddCommentWidget.css';

// Import components
import CommentList from '../CommentList';

const AddCommentWidget = (props) => {
  return (
    <div className={styles['comment-form']}>
      <CommentList />
      <CommentList />
      <h2 className={styles['comment-form-title']}><FormattedMessage id="addComment" /></h2>
      <input placeholder={props.intl.messages.authorName} className={styles['comment-form-field']}></input>
      <textarea placeholder={props.intl.messages.commentContent} className={styles['comment-form-field']}></textarea>
      <a className={styles['comment-submit-button']} href="#"><FormattedMessage id="submit" /></a>
    </div>
  );
};

AddCommentWidget.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(AddCommentWidget);
