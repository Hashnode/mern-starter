import React, { Component } from "react";
import styles from "./AddCommentForm.css";
import PropTypes from "prop-types";

class AddCommentForm extends Component {
  state = {
    formCommentText: "",
    formCommentName: "",
  };
  handleCommentText = (text) => {
    this.setState({
      formCommentText: text,
    });
  };
  handleCommentName = (text) => {
    this.setState({
      formCommentName: text,
    });
  };
  onSubmitForm = (e) => {
    e.preventDefault();
    this.props.onAddComment(
      this.state.formCommentName,
      this.state.formCommentText
    );
    this.setState({
      formCommentName: "",
      formCommentText: "",
    });
  };

  render() {
    return (
      <form onSubmit={this.onSubmitForm} className={styles["add-comment-form"]}>
        <label htmlFor="text-comment">Text of Your comment</label>
        <textarea
          className={styles["comment-filed"]}
          name=""
          id="text-comment"
          onChange={(e) => this.handleCommentText(e.target.value)}
          value={this.state.formCommentText}
        ></textarea>
        <label htmlFor="name">Your Name</label>
        <input
          onChange={(e) => this.handleCommentName(e.target.value)}
          value={this.state.formCommentName}
          id="name"
          className={styles["name-field"]}
          type="text"
        />
        <button
          disabled={!this.state.formCommentName || !this.state.formCommentText}
          className={styles["btn-add-comment"]}
          type="submit"
        >
          Add Comment
        </button>
      </form>
    );
  }
}

AddCommentForm.propTypes = {
  onAddComment: PropTypes.func.isRequired,
};

export default AddCommentForm;
