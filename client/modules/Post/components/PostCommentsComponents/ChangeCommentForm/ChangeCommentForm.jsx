import React, { Component } from "react";
import styles from "./ChangeCommentForm.css";
import PropTypes from "prop-types";

class ChangeCommentForm extends Component {
  state = {
    formCommentText: "",
  };
  handleCommentText = (text) => {
    this.setState({
      formCommentText: text,
    });
  };
  componentDidMount() {
    this.handleCommentText(this.props.comment.text);
  }
  onSubmitForm = (e) => {
    e.preventDefault();
    this.props.onEditComment(
      this.state.formCommentText,
      this.props.comment.createDate
    );
    this.props.onShowChangeForm();
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
        <div className={styles["change-commentform-btns"]}>
          <button className={styles["btn-add-comment"]} type="submit">
            Save
          </button>
          <button
            onClick={this.props.onShowChangeForm}
            className={styles["btn-add-comment"]}
          >
            Deny
          </button>
        </div>
      </form>
    );
  }
}

ChangeCommentForm.propTypes = {
  comment: PropTypes.shape({
    createDate: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  onShowChangeForm: PropTypes.func.isRequired,
  onEditComment: PropTypes.func.isRequired,
};

export default ChangeCommentForm;
