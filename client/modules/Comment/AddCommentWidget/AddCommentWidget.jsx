import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

// Import Style
import styles from './AddCommentWidget.css';

// Import components
import CommentList from '../CommentList';

// Import actions
import { addComment } from '../CommentActions';

// Import selectors
import { getComments } from '../CommentReducer';

const AddCommentWidget = (props) => {
  const authorRef = useRef();
  const contentRef = useRef();

  const addNewComment = () => {
    authorRef.current.focus();
    contentRef.current.focus();

    if (authorRef.current.value && contentRef.current.value) {
      props.addComment(authorRef.current.value, contentRef.current.value);
      authorRef.current.value = contentRef.current.value = '';
    }
  };

  const onKeyDownHandler = (e) => {
    if (e.keyCode === 13) {
      addNewComment();
    }
  };

  return (
    <div className={styles['comment-form']}>
      <CommentList comments={props.comments.comments} />
      <h2 className={styles['comment-form-title']}><FormattedMessage id="addComment" /></h2>
      <input ref={authorRef} placeholder={props.intl.messages.authorName} className={styles['comment-form-field']}></input>
      <textarea onKeyDown={onKeyDownHandler} ref={contentRef} placeholder={props.intl.messages.commentContent} className={styles['comment-form-field']}></textarea>
      <p onClick={() => addNewComment()} className={styles['comment-submit-button']} href="#"><FormattedMessage id="submit" /></p>
    </div>
  );
};

AddCommentWidget.propTypes = {
  intl: intlShape.isRequired,
  comments: PropTypes.object.isRequired,
  addComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    comments: getComments(state),
  };
};

export default injectIntl(connect(mapStateToProps, { addComment })(AddCommentWidget));
