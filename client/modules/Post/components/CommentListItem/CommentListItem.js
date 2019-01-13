import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';

// Import Style
import styles from './CommentListItem.css';

function CommentListItem(props) {
  const { comment: { name, text }, postID, onDeleteComment, onEditComment, showAddComment, showEditComment } = props;
  return (
    <React.Fragment>
      <div className={styles['single-comment']}>
        <p className={styles['author-name']}>
          <FormattedMessage id="by" /> {name}
        </p>
        <p className={styles['comment-desc']}>{text}</p>
        <p className={styles['post-action']}>
          <a href="#" onClick={onDeleteComment}>
            <FormattedMessage id="deleteComment" />
          </a>
        </p>
        <p className={styles['post-action']}>
          <Link to={`/posts/${postID}`} onClick={onEditComment}>
            <FormattedMessage id={`${showAddComment || showEditComment ? 'hideCommentForm' : 'editComment'}`} />
          </Link>
        </p>
      </div>
    </React.Fragment>
  );
}

CommentListItem.propTypes = {
  postID: PropTypes.string.isRequired,
  comment: PropTypes.shape({
    name: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  onDeleteComment: PropTypes.func.isRequired,
  onEditComment: PropTypes.func.isRequired,
  showAddComment: PropTypes.bool.isRequired,
  showEditComment: PropTypes.bool.isRequired,
};

export default CommentListItem;
