import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

// Import Style
import styles from './AddCommentWidget.css';

const AddCommentWidget = (props) => {
  return (
    <div>
      <h4><FormattedMessage id="addComment" /></h4>
      <input placeholder={props.intl.messages.authorName}></input>
      <textarea placeholder={props.intl.messages.commentContent}></textarea>
      <a className={styles['comment-submit-button']} href="#"><FormattedMessage id="submit" /></a>
    </div>
  );
};

AddCommentWidget.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(AddCommentWidget);
