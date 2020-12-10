import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import styles from './PostCommentWidget.css';
import { FormattedMessage, injectIntl } from 'react-intl';
import { PostCreateWidget } from '../PostCreateWidget/PostCreateWidget';

export const isEmpty = obj => !Object.keys(obj).length;

export class PostCommentWidget extends PureComponent {
  componentDidUpdate() {
    const comment = this.props.edit;
    if (!isEmpty(comment)) {
      this.refs.name.value = comment.name;
      this.refs.content.value = comment.content;
    }
  }

  addComment = () => {
    const nameRef = this.refs.name;
    const contentRef = this.refs.content;
    if (nameRef.value && contentRef.value) {
      this.props.addComment(nameRef.value, contentRef.value, !isEmpty(this.props.edit));
      nameRef.value = contentRef.value = '';
    }
  };

  render() {
    return (
      <div>
        <input placeholder={this.props.intl.messages.authorName} className={styles['form-field']} ref="name" />

        <textarea placeholder={this.props.intl.messages.commentContent} className={styles['form-field']} ref="content" />
        <a className={styles['post-submit-button']} href="#" onClick={this.addComment}><FormattedMessage id="submit" /></a>
      </div>
    );
  }
}

PostCreateWidget.propTypes = {
  addComment: PropTypes.func.isRequired,
  edit: PropTypes.object,
  // showAddPost: PropTypes.bool.isRequired,
  // intl: intlShape.isRequired,
};


export default injectIntl(PostCommentWidget);
