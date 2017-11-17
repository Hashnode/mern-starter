import React, { PropTypes } from "react";
import { connect } from "react-redux";

import styles from "./CommentListItem.css";

function CommentListItem(props) {
  const { author, body, cuid } = props.comment;
  const { handleEditComment, handleDeleteComment } = props;
  return (
    <div className={styles["single-comment"]}>
      <h3 className={styles["comment-author"]}>By {author}</h3>
      <p className={styles["comment-body"]}>{body}</p>
      <div className={styles["btn-group"]}>
        <button
          className={`${styles["btn"]} ${styles["edit-btn"]}`}
          onClick={() => handleEditComment(props.comment)}
        >
          Edit comment
        </button>
        <button
          className={`${styles["btn"]} ${styles["delete-btn"]}`}
          onClick={() => handleDeleteComment(cuid)}
        >
          Delete comment
        </button>
      </div>
    </div>
  );
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

export default CommentListItem;
