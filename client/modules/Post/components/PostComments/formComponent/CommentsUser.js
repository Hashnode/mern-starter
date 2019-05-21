import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { deleteComment } from '../CommentActions';

import styles from '../PostComments.css';
import postStyles from '../../PostListItem/PostListItem.css';

export function UserComment(props) {
  const { author, dateAdded, text, cuid } = props.comment;
  return (
    <div className={`${styles['user-comment']}`} key={cuid}>
      <div className={`${styles['comment-info']}`}>
        <span className={`${styles['comment-author']}`}>{`${author}`}</span>
        <span className={`${styles['comment-date']}`}>{`${new Date(dateAdded).toLocaleDateString()}`}</span>
      </div>
      <div className={`${styles['comment-content']}`}>
        <p>{`${text}`}</p>
      </div>
      <p className={postStyles['post-action']}><span onClick={() => deleteComment(cuid, props.dispatch)}>Destroy</span></p>
    </div>
  );
}

UserComment.propTypes = {
  comment: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default connect()(UserComment);
