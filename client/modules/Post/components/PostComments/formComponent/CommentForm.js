import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styles from '../PostComments.css';

export class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.addComment = this.addComment.bind(this);
  }

  addComment() {
    const author = this.refs.name.value;
    const text = this.refs.comment.value;
    if (author || text) {
      this.props.addComment({ author, text });
      this.refs.name.value = '';
      this.refs.comment.value = '';
    } else {
      alert('All the fields should be filled!');
    }
  }

  render() {
    return (
      <div className={`${styles['comment-form']}`}>
        <h4>Add yor comment</h4>
        <div>
          <input
            type="text"
            placeholder="Your name"
            required="required"
            className={`${styles['author-input']}`}
            ref="name"
          />
        </div>
        <div className={`${styles['form-item']}`}>
          <textarea type="text" className={`${styles['comment-input']}`} ref="comment" />
        </div>
        <div className={`${styles['form-item']}`}>
          <input
            type="button"
            className={`${styles['sent-comment-button']}`}
            value="Add comment"
            onClick={this.addComment}
          />
        </div>
      </div>
    );
  }
}

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default connect()(CommentForm);
