import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, FormattedMessage } from 'react-intl';

// Import Style
import styles from './CommentCreateWidget.css';

export class CommentCreateWidget extends Component {
  addComment = () => {
    const authorRef = this.refs.author;
    const contentRef = this.refs.content;
    if (authorRef.value && contentRef.value) {
      this.props.addComment(authorRef.value, contentRef.value);
      authorRef.value = contentRef.value = '';
    }
  };

  render() {
    const cls = `${styles.form}`;
    return (
      <div className={cls}>
        <div className={styles['form-title']}>Comment</div>
        <div className={styles['form-content']}>
          <input className={styles['form-field']} ref="author" />
          <textarea className={styles['form-field']} ref="content" />
          <a className={styles['post-submit-button']} href="#" onClick={this.addComment}><FormattedMessage id="submit" /></a>
        </div>
      </div>
    );
  }
}

CommentCreateWidget.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default injectIntl(CommentCreateWidget);
