import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';


// Import Style
import styles from './CommentListItem.css';

// Import selectors
import { getComment } from '../CommentReducer';

// Import actions
import { editComment, deleteComment } from '../CommentActions';

const CommentListItem = (props) => {
  const [edit, setEdit] = useState(false);

  const editAuthorRef = useRef();
  const editContentRef = useRef();

  const onClickSaveButton = () => {
    editAuthorRef.current.focus();
    editContentRef.current.focus();

    if (editAuthorRef.current.value && editContentRef.current.value) {
      props.editComment(editAuthorRef.current.value, editContentRef.current.value, props.comment.cid);
      setEdit(false);
    }
  };

  const onClickOnDeleteButton = () => {
    if (confirm(props.intl.messages.confirmDeleteComment)) { // eslint-disable-line
      props.deleteComment(props.comment.cid);
    }
  };

  return (
    <div className={styles['comment-item-container']}>
      {
        !edit ?
          <div>
            <h4><FormattedMessage id="singleComment" /> #{props.comment.cid}</h4>
            <p className={styles['author-name']}>
              <FormattedMessage id="by" />
              &nbsp;
              <p>{props.comment.author}</p>
            </p>
            <p className={styles['comment-content']}>{props.comment.content}</p>
            <p onClick={() => onClickOnDeleteButton()}className={styles['comment-delete-button']}>&times;</p>
            <p onClick={() => setEdit(true)} className={styles['comment-edit-button']}>&#9998;</p>
          </div> :
          <div>
            <h4><FormattedMessage id="singleComment" /> #{props.comment.cid}</h4>
            <input ref={editAuthorRef} defaultValue={props.comment.author} className={styles['edit-form-field']} />
            <textarea ref={editContentRef} defaultValue={props.comment.content} className={styles['edit-form-field']} />
            <button onClick={() => onClickSaveButton()} className={styles['edit-button']}>Save</button>
            <button onClick={() => setEdit(false)} className={styles['edit-button']}>Cancel</button>
          </div>
      }
    </div>
  );
};

CommentListItem.propTypes = {
  comment: PropTypes.shape({
    author: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    cid: PropTypes.number.isRequired,
  }).isRequired,
  editComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

const mapStateToProps = (state, props) => {
  return {
    getComment: getComment(state, props.comment.cid),
  };
};

export default injectIntl(connect(mapStateToProps, { editComment, deleteComment })(CommentListItem));
