import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

// Import Style
import styles from './CommentCreateWidget.css';

export class CommentCreateWidget extends Component {
  addComment = () => {
    const contentRef = this.refs.content;

    if (contentRef.value.length === 0) {
      alert(this.props.intl.messages.addCommentAlert); // eslint-disable-line

      return;
    }

    this.props.addComment(contentRef.value);
    contentRef.value = '';
  };

  render() {
    const cls = {};
    return (
      <div className={cls}>
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}><FormattedMessage id="createNewComment" /></h2>
          <textarea placeholder={this.props.intl.messages.commentContent} className={styles['form-field']} ref="content" />
          <button className={styles['post-submit-button']} onClick={this.addComment}>
            <FormattedMessage id="addComment" />
          </button>
        </div>
      </div>
    );
  }
}

CommentCreateWidget.propTypes = {
  addComment: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(CommentCreateWidget);
