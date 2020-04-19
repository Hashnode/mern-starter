import React, { Component } from 'react';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';

import s from './CommentForm.css';
import Button from '../../../App/components/Button/Button';

class CommentForm extends Component {
  onSubmit = () => {
    const authorRef = this.refs.author;
    const textRef = this.refs.text;
    if (authorRef.value && textRef.value) {
      this.props.onSubmit(authorRef.value, textRef.value);
      authorRef.value = textRef.value = '';
    }
  };

  render() {
    return (
      <div className={s.form}>
        <input placeholder={this.props.intl.messages.authorName} defaultValue={this.props.comment.author} className={s.formField} ref="author" />
        <textarea placeholder={this.props.intl.messages.postContent} defaultValue={this.props.comment.text} className={s.formField} ref="text" />
        <div className={s.footer}>
          <Button onClick={this.props.onCancel}>
            <FormattedMessage id="cancel" />
          </Button>
          <Button onClick={this.onSubmit}>
            <FormattedMessage id="submit" />
          </Button>
        </div>
      </div>
    );
  }
}

CommentForm.defaultProps = {
  comment: {
    author: '',
    text: '',
  },
};

CommentForm.propTypes = {
  intl: intlShape.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  comment: PropTypes.shape({
    author: PropTypes.string,
    text: PropTypes.string,
  }),
};

export default injectIntl(CommentForm);
