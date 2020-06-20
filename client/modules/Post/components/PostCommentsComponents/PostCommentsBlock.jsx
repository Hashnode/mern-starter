import React, { Component } from "react";
import styles from "./PostCommentsBlock.css";
import PostComments from "./PostComments/PostComments.jsx";
import PropTypes from "prop-types";

class PostCommentsBlock extends Component {
  state = {
    isOpenComments: false,
    comments: [],
  };
  handleToggleComments = () => {
    this.setState({
      isOpenComments: !this.state.isOpenComments,
    });
  };
  onAddComment = (name, text) => {
    const newComment = {
      name,
      text,
      createDate: new Date(),
    };
    const updatedComments = [...this.state.comments];
    updatedComments.unshift(newComment);
    this.setState({
      comments: updatedComments,
    });
  };
  onDeleteComment = (id) => {
    this.setState({
      comments: this.state.comments.filter(
        (comment) => comment.createDate !== id
      ),
    });
  };
  onEditComment = (newText, id) => {
    let commentPlace;
    const editingComment = this.state.comments.find(
      (comment) => comment.createDate === id
    );
    this.state.comments.forEach((comment, index) => {
      if (comment.createDate === editingComment.createDate) {
        commentPlace = index;
      }
    });
    const updatedComment = { ...editingComment, text: newText };
    const upDatedComments = [...this.state.comments];
    upDatedComments.splice(commentPlace, 1, updatedComment);
    this.setState({
      comments: upDatedComments,
    });
  };
  render() {
    return (
      <div className={styles["wrapper-block"]}>
        {this.state.isOpenComments ? (
          <PostComments
            handleToggleComments={this.handleToggleComments}
            onAddComment={this.onAddComment}
            onDeleteComment={this.onDeleteComment}
            onEditComment={this.onEditComment}
            comments={this.state.comments}
          />
        ) : (
          <div
            onClick={this.handleToggleComments}
            className={styles["open-comments"]}
          >
            Comments, {this.state.comments.length}
          </div>
        )}
      </div>
    );
  }
}

PostCommentsBlock.propTypes = {
  post: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
  commentsData: PropTypes.shape({
    cuid: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    certainComments: PropTypes.arrayOf(
      PropTypes.shape({
        createDate: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
      })
    ),
  }),
};
PostCommentsBlock.defaultProps = {
  commentsData: undefined,
};

export default PostCommentsBlock;
