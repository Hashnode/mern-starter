import React, { Component } from 'react';

// Import Style
import styles from './PostCommentsForm.css';

export class PostCommentsForm extends Component {
  
  handleOnSubmit = (e) => {
    e.preventDefault();

    const authorRef = this.refs.author;
    const textRef = this.refs.text;

    this.props.onSubmit(authorRef.value, textRef.value);
  }

  render() {
    const props = this.props;

    return (
      <form onSubmit={this.handleOnSubmit}>
        <div className={styles['comment-author']}>
          <span>Name: </span>
          <input type='text' required ref="author" />
        </div>
        <div>
          <textarea type='text' required ref="text" className={styles['comment-text']} rows={2} cols={50}></textarea>
        </div>
        <button className={styles['comment-button']}>Add comment</button>
      </form>
    );
  }
}

export default PostCommentsForm;
