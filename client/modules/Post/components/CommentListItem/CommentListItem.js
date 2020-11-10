import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { deleteComment } from '../../CommentActions';
import { toggleAddComment } from '../../../App/AppActions';
import CommentEdit from '../../CommentEdit/CommentEdit';
import styles from './CommentListItem.css';

// eslint-disable-next-line no-shadow
export const CommentListItemA = ({ comment, deleteComment, toggleAddComment }) => {
  return (
    <div className={styles['single-comment']}>
      <p className={styles['author-name']}><FormattedMessage id="by" /> {comment.name}</p>
      <p className={styles['comment-desc']}>{comment.content}</p>
      <p className={styles['comment-action']}><a href="#" onClick={() => deleteComment(comment.commentId)}><FormattedMessage id="deleteComment" /></a></p>
      <p className={styles['comment-action']}><a href="#" onClick={() => toggleAddComment()}><FormattedMessage id="editComment" /></a></p>
      <CommentEdit comment={comment} />
    </div>
  );
};

CommentListItemA.propTypes = {
  comment: PropTypes.shape({
    content: PropTypes.string.isRequired,
    commentId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  toggleAddComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
};


const mapStateToProps = state => ({ showAddComment: state.app.showAddComment, messages: state.intl.messages });
const mapDispatchToProps = { deleteComment, toggleAddComment };
const CommentListItem = connect(mapStateToProps, mapDispatchToProps)(CommentListItemA);
export default CommentListItem;
