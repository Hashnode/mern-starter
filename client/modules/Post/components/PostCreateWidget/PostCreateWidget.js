import React, { Component, PropTypes } from 'react';

// Import Style
import styles from './PostCreateWidget.css';

class PostCreateWidget extends Component {
  addPost = () => {
    const nameRef = this.refs.name;
    const titleRef = this.refs.title;
    const contentRef = this.refs.content;
    if (nameRef.value && titleRef.value && contentRef.value) {
      this.props.addPost(nameRef.value, titleRef.value, contentRef.value);
      nameRef.value = titleRef.value = contentRef.value = '';
    }
  };

  render() {
    const cls = `${styles.form} ${(this.props.showAddPost ? styles.appear : '')}`;
    return (
      <div className={cls}>
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}>Create new post</h2>
          <input placeholder="Author's Name" className={styles['form-field']} ref="name" />
          <input placeholder="Post Title" className={styles['form-field']} ref="title" />
          <textarea placeholder="Post Content" className={styles['form-field']} ref="content" />
          <a className={styles['post-submit-button']} href="#" onClick={this.addPost}>Submit</a>
        </div>
      </div>
    );
  }
}

PostCreateWidget.propTypes = {
  addPost: PropTypes.func.isRequired,
  showAddPost: PropTypes.bool.isRequired,
};

export default PostCreateWidget;
