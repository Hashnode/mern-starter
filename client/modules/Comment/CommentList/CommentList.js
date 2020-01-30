import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

// Import style
import styles from './CommentList.css';

// Import Components
import CommentListItem from '../components/CommentListItem/CommentListItem';

function CommentList({ comments, deleteComment }) {
  return (
    <div className={styles.container}>
      {comments && comments.length ? comments.map(comment => (
        <CommentListItem
          key={comment.cuid}
          comment={comment}
          onDelete={deleteComment}
        />
      )) : (
        <div className={styles['no-comments']}>
          <FormattedMessage id="emptyComments" />
        </div>
      )}
    </div>
  );
}

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({
    cuid: PropTypes.string,
    author: PropTypes.string,
    content: PropTypes.string,
  })),
  deleteComment: PropTypes.func.isRequired,
};

export default CommentList;
