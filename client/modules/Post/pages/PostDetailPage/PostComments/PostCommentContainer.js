import React, { PropTypes, Component } from 'react';

// Previous comments block
import { PostCommentList } from './PostCommentList';

// Styles
import style from './PostCommentContainer.css';

export class PostCommentContainer extends Component {
  constructor (props) {
    super(props);
  };

  addComment = () => {
    const commentAuthorName = this.refs.name.value;
    const commentText = this.refs.text.value;
    if (commentText && commentAuthorName) {
      const comment = { postId: this.props.postId,
                        commentAuthorName: commentAuthorName,
                        commentText: commentText };
      this.props.addComment(comment);
      this.refs.name.value = '';
      this.refs.text.value = '';
    }
  }

  render() {
    return (
      <div className={style['comments']}>
        <hr></hr>
        <PostCommentList comments={this.props.comments} />
        <input
          className={style['comment-author']}
          placeholder="Enter your name, please"
          ref="name"
        />
        <textarea
          className={style['comment-text']}
          placeholder="Enter your comment here!"
          ref="text"
        />
        <button className={style['comment-button']} onClick={this.addComment}>
          Post comment
        </button>
      </div>
    );
  }
}

PostCommentContainer.propTypes = {
  comments: PropTypes.array.isRequired,
  postId: PropTypes.string.isRequired,
  addComment: PropTypes.func.isRequired,
};
