import React, { PropTypes, Component } from "react";
import { connect } from "react-redux";

import styles from "./CommentListItem.css";

class CommentListItem extends Component {
  editComment = () => {};

  deleteComment = () => {};

  render() {
    const { author, body, cuid } = this.props.comment;
    return (
      <div className={styles["single-comment"]}>
        <h3 className={styles["comment-author"]}>By {author}</h3>
        <p className={styles["comment-body"]}>{body}</p>
        <div className={styles["btn-group"]}>
          <button
            className={`${styles["btn"]} ${styles["edit-btn"]}`}
            onClick={() => this.props.handleEditComment(null)}
          >
            Edit comment
          </button>
          <button
            className={`${styles["btn"]} ${styles["delete-btn"]}`}
            onClick={() => this.props.handleDeleteComment(cuid)}
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
  }).isRequired,
  handleEditComment: PropTypes.func.isRequired,
  handleDeleteComment: PropTypes.func.isRequired
};

export default connect()(CommentListItem);
