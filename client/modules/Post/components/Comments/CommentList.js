import React, { PropTypes } from "react";

import CommentListItem from "./CommentListItem";

import styles from "./CommentList.css";

function CommentList(props) {
  if (props.comments.length === 0) {
    return null;
  }
  return (
    <div className={styles["comment-view"]}>
      {props.comments.map(comment => (
        <CommentListItem key={comment.cuid} comment={comment} />
      ))}
    </div>
  );
}

CommentList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      author: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      cuid: PropTypes.string.isRequired
    })
  ).isRequired
};

export default CommentList;
