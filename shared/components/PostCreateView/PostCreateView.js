/* eslint no-unused-vars: 0 */
import React, { Component, PropTypes } from 'react';

class PostCreateView extends Component {
  constructor(props, context) {
    super(props, context);
    this.addPost = this.addPost.bind(this);
  }

  addPost() {
    const nameRef = this.refs.name;
    const titleRef = this.refs.title;
    const contentRef = this.refs.content;
    if (nameRef.value && titleRef.value && contentRef.value) {
      this.props.addPost(nameRef.value, titleRef.value, contentRef.value);
      nameRef.value = titleRef.value = contentRef.value = '';
    }
  }

  render() {
    console.log(this.props.showAddPost);
    const cls = 'form' + (this.props.showAddPost ? 'appear' : '');
    return (
      <div className={cls}>
        <h2 className="new-post">Add a new post</h2>
        <input placeholder="Name" className="input" ref="name"/>
        <input placeholder="Title" ref="title"/>
        <textarea placeholder="Content" ref="content"></textarea>
        <a className="button align-right" onClick={this.addPost}>Submit</a>
      </div>);
  }
}

PostCreateView.propTypes = {
  addPost: PropTypes.func.isRequired,
  showAddPost: PropTypes.bool.isRequired,
};

export default PostCreateView;
