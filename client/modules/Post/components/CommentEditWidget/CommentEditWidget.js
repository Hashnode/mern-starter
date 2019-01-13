import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

// Import Style
import styles from './CommentEditWidget.css';

export class CommentEditWidget extends Component {
  editComment = () => {
    const { name, content } = this.refs;
    const { editComment, postId } = this.props;

    const nameRef = name;
    const contentRef = content;

    if (nameRef.value && contentRef.value) {
      editComment(postId, nameRef.value, contentRef.value);
      nameRef.value = contentRef.value = '';
    }
  };

  render() {
    const { showEditComment, intl: { messages } } = this.props;
    const cls = `${styles.form} ${(showEditComment ? styles.appear : '')}`;
    return (
      <div className={cls}>
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}><FormattedMessage id="editComment" /></h2>
          <input placeholder={messages.authorName} className={styles['form-field']} ref="name" />
          <textarea placeholder={messages.commentContent} className={styles['form-field']} ref="content" />
          <a className={styles['post-submit-button']} href="#" onClick={this.editComment}><FormattedMessage id="submit" /></a>
        </div>
      </div>
    );
  }
}

CommentEditWidget.propTypes = {
  postId: PropTypes.string,
  editComment: PropTypes.func.isRequired,
  showEditComment: PropTypes.bool.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(CommentEditWidget);
