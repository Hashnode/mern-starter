import React, { Component } from "react";
import { connect } from "react-redux";

import styles from "./CommentCreateWidget.css";

class CommentCreateWidget extends Component {
  createComment = e => {
    e.preventDefault();
    alert("hey");
  };
  render() {
    return (
      <div className={styles["form"]}>
        <div className={styles["form-content"]}>
          <h2 className={styles["form-title"]}>Write a new comment</h2>
          <input placeholder="Author" className={styles["form-field"]} />

          <textarea
            placeholder="Write your comment here"
            className={styles["form-field"]}
          />
          <a
            className={styles["post-submit-button"]}
            href="#"
            onClick={this.createComment}
          >
            Save edit
          </a>
        </div>
      </div>
    );
  }

  componentWillUnmount() {
    // clear edit component form
  }
}

function mapStateToProps({ comments }) {
  return {
    editComment: comments.editComment
  };
}

export default connect(mapStateToProps)(CommentCreateWidget);
