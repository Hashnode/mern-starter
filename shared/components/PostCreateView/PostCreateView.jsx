import React, { Component, PropTypes } from 'react';
import styles from './PostCreateView.css';
import cssModules from 'react-css-modules';

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
    const cls = `form ${(this.props.showAddPost ? 'appear' : '')}`;
    return (
      <div styleName={cls}>
        <div styleName="form-content">
          <h2 styleName="form-title">Create new post</h2>
          <input placeholder="Author's Name" styleName="form-field" ref="name"/>
          <input placeholder="Post Title" styleName="form-field" ref="title"/>
          <textarea placeholder="Post Content" styleName="form-field" ref="content"></textarea>
          <a className="align-right" styleName="post-submit-button" href="#" onClick={this.addPost}>Submit</a>
        </div>
      </div>
    );
  }
}

PostCreateView.propTypes = {
  addPost: PropTypes.func.isRequired,
  showAddPost: PropTypes.bool.isRequired,
};

export default cssModules(PostCreateView, styles, { allowMultiple: true });
