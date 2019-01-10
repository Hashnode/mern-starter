import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

// Import Style
import styles from './CommentCreateWidget.css';

export class CommentCreateWidget extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.props.comment,
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
  }

  onSuccess() {
    if (this.state.name && this.state.content) {
      this.props.onSuccess(this.state);
    }
  }

  handleChange(e) {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  }

  render() {
    return (
      <div className={styles.modal}>
        <div className={styles['modal-content']}>
          <span className={styles.close} onClick={this.props.onClose}>&times;</span>
          <div className={styles['form-content']}>
            <h2 className={styles['form-title']}>
              <FormattedMessage id={`${this.props.type}Comment`} />
            </h2>
            <input
              placeholder={this.props.intl.messages.authorName}
              className={styles['form-field']}
              onChange={this.handleChange}
              value={this.state.name}
              name="name"
            />
            <textarea
              placeholder={this.props.intl.messages.commentContent}
              className={styles['form-field']} ref="content"
              onChange={this.handleChange}
              value={this.state.content}
              name="content"
            />
            <button className={styles['success-button']} onClick={this.onSuccess}>
              <FormattedMessage id="submit" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

CommentCreateWidget.propTypes = {
  type: PropTypes.string.isRequired,
  comment: PropTypes.shape({
    name: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    postCuid: PropTypes.string,
    cuid: PropTypes.string,
    dateAdded: PropTypes.string,
  }).isRequired,
  intl: intlShape.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default injectIntl(CommentCreateWidget);
