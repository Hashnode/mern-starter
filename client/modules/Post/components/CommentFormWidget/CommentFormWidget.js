import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';

// Import styles
import styles from './CommentFormWidget.css';

function CommentFormWidget({ initialValues, onChange, onSubmit }, { intl }) {
  const { author, content } = initialValues || {};
  return (
    <form onSubmit={onSubmit} className={styles.container}>
      <label htmlFor="author">
        <FormattedMessage id="commentForm.author.label" />
      </label>
      <input
        type="text"
        name="author"
        value={author || ''}
        placeholder={intl.formatMessage({ id: 'commentForm.author.placeholder' })}
        onChange={e => onChange(e)}
      />
      <label htmlFor="content">
        <FormattedMessage id="commentForm.content.label" />
      </label>
      <textarea
        name="content"
        value={content || ''}
        placeholder={intl.formatMessage({ id: 'commentForm.content.placeholder' })}
        onChange={e => onChange(e)}
      />
      <button type="submit">
        <FormattedMessage id="submit" />
      </button>
    </form>
  );
}

CommentFormWidget.defaultProps = {
  initialValues: {
    author: '',
    content: '',
    commentId: '',
  },
};

CommentFormWidget.propTypes = {
  initialValues: PropTypes.shape({
    author: PropTypes.string,
    content: PropTypes.string,
    commentId: PropTypes.string,
  }),
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

CommentFormWidget.contextTypes = {
  intl: PropTypes.object,
};

export default injectIntl(CommentFormWidget);
