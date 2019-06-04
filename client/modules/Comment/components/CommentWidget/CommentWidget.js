import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import Button from '../../../../components/Button/Button';

// Import Style
import styles from './CommentWidget.css';

export class CommentWidget extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: this.props.username,
      content: this.props.content,
    };
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  }

  submitForm = () => {
    if (this.state.username && this.state.content) {
      this.props.submit(this.state.username, this.state.content);
      this.state.username = '';
      this.state.content = '';
    }
  };

  render() {
    const cls = `${styles.form} ${(this.props.isVisible ? styles.appear : '')}`;
    return (
      <div className={cls}>
        <div className={styles['form-content']}>
          <input
            placeholder={this.props.intl.messages.username}
            className={styles['form-field']}
            value={this.state.username}
            onChange={this.handleChange}
            name="username"
            ref="username"
          />
          <textarea
            placeholder={this.props.intl.messages.commentContent}
            className={styles['form-field']}
            value={this.state.content}
            onChange={this.handleChange}
            name="content"
          />
          <Button className={styles['comment-submit-button']} onClick={this.submitForm}><FormattedMessage id="submit" /></Button>
          <Button className={styles['comment-cancel-button']} onClick={this.props.cancel}><FormattedMessage id="cancel" /></Button>
        </div>
      </div>
    );
  }
}

CommentWidget.propTypes = {
  submit: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
  intl: intlShape.isRequired,
  username: PropTypes.string,
  content: PropTypes.string,
};

CommentWidget.defaultProps = {
  username: '',
  content: '',
};

export default injectIntl(CommentWidget);
