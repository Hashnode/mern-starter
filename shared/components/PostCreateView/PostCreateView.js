/* eslint no-unused-vars: 0 */
import React, { Component, PropTypes } from 'react';

if (typeof window !== 'undefined') {
  require('./PostCreateView.css');
}

class PostCreateView extends Component {
  constructor(props, context) {
    super(props, context);
    this.addPost = this.addPost.bind(this);
  }

  addPost() {
    if (this.refs.name.value && this.refs.title.value && this.refs.content.value) {
      this.props.addPost(this.refs.name.value, this.refs.title.value, this.refs.content.value);
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
