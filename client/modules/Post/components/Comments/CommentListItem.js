import React, { PropTypes, Component } from "react";
import { connect } from "react-redux";

import styles from "./CommentListItem.css";

class CommentListItem extends Component {
  editComment = () => {};

  deleteComment = () => {
    let confirmDelete = confirm(
      "Are you sure you want to delete this comment?"
    );
    if (confirmDelete) {
      // call api endpoint
    }
  };

  render() {
    const { author, body } = this.props.comment;
    return (
      <div className={styles["single-comment"]}>
        <h3 className={styles["comment-author"]}>By {author}</h3>
        <p className={styles["comment-body"]}>{body}</p>
        <div className={styles["btn-group"]}>
          <button
            className={`${styles["btn"]} ${styles["edit-btn"]}`}
            onClick={this.editComment}
          >
            Edit comment
          </button>
          <button
            className={`${styles["btn"]} ${styles["delete-btn"]}`}
            onClick={this.deleteComment}
          >
            Delete comment
          </button>
        </div>
      </div>
    );
  }
}

CommentListItem.propTypes = {
  comment: PropTypes.shape({
    author: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired
  }).isRequired
};

export default CommentListItem;
