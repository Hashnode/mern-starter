import React from 'react';
import PropTypes from 'prop-types';
import { FormattedDate, FormattedMessage, injectIntl, intlShape } from 'react-intl';

import styles from './CommentListItem.css';

class CommentsListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      textareaValue: this.props.comment.body || '',
    };
  }

  onChangeHandler = e => {
    this.setState({ textareaValue: e.target.value });
  }

  onCancelHandler = () => {
    this.setState({
      isEditing: false,
      textareaValue: this.props.comment.body,
    });
  }

  onEditHandler = () => {
    this.setState({ isEditing: true });
  }

  onConfirmHandler = () => {
    const {
      textareaValue,
    } = this.state;

    const {
      onEditComment,
    } = this.props;

    if (textareaValue.length === 0) {
      alert(this.props.intl.messages.addCommentAlert); // eslint-disable-line
      return false;
    }

    onEditComment(textareaValue);
    this.setState({ isEditing: false });

    return true;
  }

  render() {
    const {
      comment,
      onDeleteComment,
      isOwner,
    } = this.props;

    const {
      isEditing,
      textareaValue,
    } = this.state;

    return (
      <div className={styles.comment}>
        <div className={styles.comment_header}>
          <span className={styles.comment_author}>{comment.author}</span>
          <span className={styles.comment_date}>
            <FormattedDate
              value={comment.dateAdded}
              year="numeric"
              month="long"
              day="2-digit"
            />
          </span>
        </div>
        {
          isEditing ? (
            <div>
              <div className={styles.comment_body}>
                <textarea
                  className={styles.comment_textarea}
                  cols="30"
                  rows="10"
                  onChange={this.onChangeHandler}
                  value={textareaValue}
                />
              </div>
              <div className={styles.comment_action}>
                <button onClick={this.onConfirmHandler} className={styles.comment_edit}>
                  <FormattedMessage id="editComment" />
                </button>
                <button onClick={this.onCancelHandler} className={styles.comment_delete}>
                  <FormattedMessage id="cancelComment" />
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className={styles.comment_body}>{comment.body}</div>
              {
                isOwner && (
                  <div className={styles.comment_action}>
                    <button onClick={this.onEditHandler} className={styles.comment_edit}>
                      <FormattedMessage id="editComment" />
                    </button>
                    <button onClick={onDeleteComment} className={styles.comment_delete}>
                      <FormattedMessage id="deleteComment" />
                    </button>
                  </div>
                )
              }
            </div>
          )
        }
      </div>
    );
  }
}

CommentsListItem.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    dateAdded: PropTypes.string.isRequired,
  }).isRequired,
  isOwner: PropTypes.string.isRequired,
  onEditComment: PropTypes.func.isRequired,
  onDeleteComment: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(CommentsListItem);
