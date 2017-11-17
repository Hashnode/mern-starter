import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";

import styles from "./CommentCreateWidget.css";
import {
  addCommentRequest,
  cancelEditMode,
  updateCommentRequest
} from "../../CommentActions";

class CommentCreateWidget extends Component {
  state = {
    author: "",
    body: ""
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.editComment) {
      this.setState({
        author: nextProps.editComment.author,
        body: nextProps.editComment.body
      });
    }
  }

  createComment = e => {
    e.preventDefault();
    if (this.state.author && this.state.body) {
      this.props.dispatch(
        addCommentRequest(
          { author: this.state.author, body: this.state.body },
          this.props.ownerId
        )
      );
      this.setState({ author: "", body: "" });
    }
  };

  saveEditComment = e => {
    e.preventDefault();
    if (!this.state.body) {
      return;
    }
    if (this.props.editComment.body === this.state.body) {
      this.cancelEditComment(e);
      return;
    }

    this.props.dispatch(
      updateCommentRequest(this.state.body, this.props.editComment.cuid)
    );
    this.cancelEditComment(e);
  };

  cancelEditComment = e => {
    e.preventDefault();
    this.props.dispatch(cancelEditMode());
    this.setState({ author: "", body: "" });
  };

  renderCreateForm() {
    return (
      <div className={styles["form"]}>
        <div className={styles["form-content"]}>
          <h2 className={styles["form-title"]}>Write a new comment</h2>
          <input
            placeholder="Author"
            className={styles["form-field"]}
            value={this.state.author}
            onChange={e => this.setState({ author: e.target.value })}
          />

          <textarea
            placeholder="Write your comment here"
            className={styles["form-field"]}
            value={this.state.body}
            onChange={e => this.setState({ body: e.target.value })}
          />
          <a
            className={styles["comment-submit-button"]}
            href="#"
            onClick={this.createComment}
          >
            Create
          </a>
        </div>
      </div>
    );
  }

  renderEditForm = () => {
    return (
      <div className={styles["form"]}>
        <div className={styles["form-content"]}>
          <h2 className={styles["form-title"]}>Edit existing comment</h2>
          <h3 className={styles["comment-author"]}>By {this.state.author}</h3>

          <textarea
            placeholder="Write your comment here"
            className={styles["form-field"]}
            value={this.state.body}
            onChange={e => this.setState({ body: e.target.value })}
          />
          <a
            className={styles["comment-submit-button"]}
            href="#"
            onClick={this.saveEditComment}
          >
            Save Edit
          </a>
          <a
            className={styles["comment-cancel-button"]}
            href="#"
            onClick={this.cancelEditComment}
          >
            Cancel
          </a>
        </div>
      </div>
    );
  };

  render() {
    if (this.props.editComment) {
      return this.renderEditForm();
    }
    return this.renderCreateForm();
  }
}

CommentCreateWidget.propTypes = {
  ownerId: PropTypes.string.isRequired,
  editComment: PropTypes.shape({
    author: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
    dataAdded: PropTypes.instanceOf(Date)
  }),
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps({ comments }) {
  return {
    editComment: comments.editComment
  };
}

export default connect(mapStateToProps)(CommentCreateWidget);
