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
    return (
      <div className="form">
        <input placeholder="Name" ref="name"/><br/>
        <input placeholder="Title" ref="title"/><br/>
        <textarea placeholder="Content" ref="content"></textarea><br/>
        <button onClick={this.addPost}>Submit</button>
      </div>);
  }
}

PostCreateView.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default PostCreateView;
