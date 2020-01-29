import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

// Import style
import styles from './CommentList.css';

// Import Components
import CommentListItem from '../CommentListItem/CommentListItem';

function CommentList({ comments, editComment, deleteComment }) {
  return (
    <div className={styles.container}>
      {comments && comments.length ? comments.map(comment => (
        <CommentListItem
          key={comment.cuid}
          comment={comment}
          editComment={editComment}
          deleteComment={deleteComment}
        />
      )) : (<FormattedMessage id="emptyComments" />)}
      <div className={styles.actions}>
        <button type="button" onClick={this.toggleForm}>
          <FormattedMessage id="addComment" />
        </button>
      </div>
    </div>
  );
}

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({
    cuid: PropTypes.string,
    author: PropTypes.string,
    content: PropTypes.string,
  })),
  editComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

export default CommentList;
