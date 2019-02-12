import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, FormattedMessage } from 'react-intl';

// Import Style
import styles from './CommentEditWidget.css';

export class CommentEditWidget extends Component {
  updateComment = () => {
    const contentRef = this.refs.content;
    if (contentRef.value) {
      this.props.onUpdate(contentRef.value);
    }
  };

  render() {
    return (
      <div>
        <textarea
          className={styles['form-field']}
          ref="content"
          defaultValue={this.props.comment.content}
        />
        <a
          className={styles['post-submit-button']}
          href="#"
          onClick={this.updateComment}
        >
          <FormattedMessage id="submit" />
        </a>
      </div>
    );
  }
}

CommentEditWidget.propTypes = {
  onUpdate: PropTypes.func.isRequired,
  comment: PropTypes.shape({
    content: PropTypes.string.isRequired,
  }).isRequired,
};

export default injectIntl(CommentEditWidget);
