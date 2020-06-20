import React from "react";
import AddCommentForm from "../AddCommentForm/AddCommentForm";
import Comment from "../Comment/Comment.jsx";
import styles from "./PostComments.css";
import PropTypes from "prop-types";

const PostComments = (props) => {
  return (
    <React.Fragment>
      <AddCommentForm onAddComment={props.onAddComment} />
      {props.comments.map((comment) => (
        <Comment
          onDeleteComment={props.onDeleteComment}
          onEditComment={props.onEditComment}
          key={comment.createDate}
          {...comment}
        />
      ))}
      <div
        onClick={props.handleToggleComments}
        className={styles["collapse-comments"]}
      >
        Collapse comments
      </div>
    </React.Fragment>
  );
};

PostComments.propTypes = {
  handleToggleComments: PropTypes.func.isRequired,
  onAddComment: PropTypes.func.isRequired,
  onDeleteComment: PropTypes.func.isRequired,
  onEditComment: PropTypes.func.isRequired,
  comments: PropTypes.array.isRequired,
};

export default PostComments;
