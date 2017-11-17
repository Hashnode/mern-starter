import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";

import styles from "./CommentCreateWidget.css";
import { addCommentRequest } from "../../CommentActions";

class CommentCreateWidget extends Component {
  state = {
    author: "",
    body: ""
  };

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

  render() {
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
            className={styles["post-submit-button"]}
            href="#"
            onClick={this.createComment}
          >
            Create
          </a>
        </div>
      </div>
    );
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
