import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

// Import Style
import styles from './CommentCreateWidget.css';

export class CommentCreateWidget extends Component {
  onSuccess = () => {
    const nameRef = this.refs.name;
    const contentRef = this.refs.content;

    if (nameRef.value && contentRef.value) {
      this.props.onSuccess({
        ...this.props.comment,
        name: nameRef.value,
        content: contentRef.value,
      });
    }
  };

  render() {
    const cls = `${styles.form} ${styles.appear}`;
    return (
      <div className={cls}>
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}><FormattedMessage id="createNewPost" /></h2>
          <input placeholder={this.props.intl.messages.authorName} className={styles['form-field']} ref="name" />
          <textarea placeholder={this.props.intl.messages.postContent} className={styles['form-field']} ref="content" />
          <button className={styles['post-submit-button']} onClick={this.onSuccess}><FormattedMessage id="submit" /></button>
        </div>
      </div>
    );
  }
}

CommentCreateWidget.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  comment: PropTypes.shape({
    name: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    postCuid: PropTypes.string,
    cuid: PropTypes.string,
    dateAdded: PropTypes.string,
  }).isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(CommentCreateWidget);
