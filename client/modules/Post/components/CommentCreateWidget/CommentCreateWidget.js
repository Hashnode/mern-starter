import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

// Import Style
import styles from './CommentCreateWidget.css';

export class CommentCreateWidget extends Component {
  addComment = () => {
    const { name, content } = this.refs;
    const { addComment, postId } = this.props;

    const nameRef = name;
    const contentRef = content;
    if (nameRef.value && contentRef.value) {
      addComment(postId, nameRef.value, contentRef.value);
      nameRef.value = contentRef.value = '';
    }
  };

  render() {
    const { showAddComment, intl: { messages } } = this.props;
    const cls = `${styles.form} ${(showAddComment ? styles.appear : '')}`;
    return (
      <div className={cls}>
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}><FormattedMessage id="createComment" /></h2>
          <input placeholder={messages.authorName} className={styles['form-field']} ref="name" />
          <textarea placeholder={messages.commentContent} className={styles['form-field']} ref="content" />
          <a className={styles['post-submit-button']} href="#" onClick={this.addComment}><FormattedMessage id="submit" /></a>
        </div>
      </div>
    );
  }
}

CommentCreateWidget.propTypes = {
  postId: PropTypes.string,
  addComment: PropTypes.func.isRequired,
  showAddComment: PropTypes.bool.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(CommentCreateWidget);
