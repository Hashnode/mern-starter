import React, { PropTypes, Component } from "react";
import { connect } from "react-redux";

import CommentListItem from "./CommentListItem";
import { deleteCommentRequest } from "../../CommentActions";

import styles from "./CommentList.css";

class CommentList extends Component {
  handleDeleteComment = cuid => {
    if (confirm("Do you want to delete this post")) {
      // eslint-disable-line
      this.props.dispatch(deleteCommentRequest(cuid));
    }
  };

  handleEditComment = comment => {
    // handle edit
  };
  render() {
    return (
      <div className={styles["comment-view"]}>
        {this.props.comments.map(comment => (
          <CommentListItem
            key={comment.cuid}
            comment={comment}
            handleDeleteComment={this.handleDeleteComment}
            handleEditComment={this.handleEditComment}
          />
        ))}
      </div>
    );
  }
}

CommentList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      author: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      cuid: PropTypes.string.isRequired
    })
  ).isRequired,
  dispatch: PropTypes.func.isRequired
};

export default connect()(CommentList);
