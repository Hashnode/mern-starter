import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styles from '../PostComments.css';

export class CommentForm extends Component {
 /* state = {
    author: '',
    text: '',
  }*/

  toaddComment = () => {
    const author = this.refs.name;
    const text = this.refs.comment;
    if (author.value && text.value) {
      this.props.addComment(author.value, text.value);
      this.refs.name.value = '';
      this.refs.comment.value = '';
    } else {
      alert('No, pls fill all inputs ');
    }
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: [e.target.value],
    });
  }

  render() {
    return (
      <div className={`${styles['comment-form']}`}>
        <h3>New comment</h3>
        <div>
          <input
            type="text"
            placeholder="Author name"
            required="required"
            className={`${styles['author-input']}`}
            ref="name"
            name="author"
            onChange={this.handleChange}
          />
        </div>
        <div className={`${styles['form-item']}`}>
          <textarea type="text" name="text" className={`${styles['comment-input']}`} ref="comment" onChange={this.handleChange} />
        </div>
        <div className={`${styles['form-item']}`}>
          <input
            type="button"
            className={`${styles['sent-comment-button']}`}
            value="Add comment"
            onClick={this.toaddComment}
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
