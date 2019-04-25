import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import styles from './CommentAddForm.css';

import {
  commentFormForPostClose,
  commentRequestAdd,
} from '../../PostActions';

const CommentAddForm = (props) => {
  function addCommentHandler(event) {
    const {
      authorName,
      comment,
      commentAdd,
      postId,
    } = props;

    event.preventDefault();
    commentAdd(authorName, comment, postId);
  }

  return (
    <form onSubmit={addCommentHandler}>
      <div>
        <label>Author name</label>
        <span
          className={styles['close-comment']}
          onClick={props.addFormClose}
        >
          &times;
        </span>
        <div>
          <Field
            name="authorName"
            component="input"
            type="text"
            placeholder="Author name"
          />
        </div>
      </div>
      <div>
        <label>Comment</label>
        <div>
          <Field
            name="comment"
            component="textarea"
            type="text"
            placeholder="Comment"
          />
        </div>
      </div>
      <div>
        <button type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

CommentAddForm.propTypes = {
  postId: PropTypes.string.isRequired,
  authorName: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
  commentAdd: PropTypes.func.isRequired,
  addFormClose: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  addFormClose: () => dispatch(commentFormForPostClose()),
  commentAdd: (authorName, comment, postId) =>
    dispatch(commentRequestAdd(authorName, comment, postId)),
});

export default connect(null, mapDispatchToProps)(CommentAddForm);
