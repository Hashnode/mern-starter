import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

import CommentsList from '../../../Comment/components/CommentsList';

// Import Style
import styles from './PostListItem.css';
import CommentCreateWidget from '../../../Comment/components/CommentCreateWidget/CommentCreateWidget';

const PostListItem = props => {
  const [openedCommentId, openComments] = useState(null);
  const [isCommentAddingFormOpen, openCommentsForm] = useState(false);

  const showComments = id => {
    props.handleFetchComments(id);

    if (openedCommentId === id) {
      openComments(null);
    } else {
      openComments(id);
    }
  };

  return (
    <div className={styles['single-post']}>
      <h3 className={styles['post-title']}>
        <Link to={`/posts/${props.post.slug}-${props.post.cuid}`}>
          {props.post.title}
        </Link>
      </h3>
      <div className={styles['post-main-line']}>
        <p className={styles['author-name']}>
          <FormattedMessage id="by" /> {props.post.name}
        </p>
        <a
          className={styles['comment-create-button']}
          href="#"
          onClick={() => openCommentsForm(true)}
        >
          <FormattedMessage id="createNewComment" />
        </a>
      </div>
      <p className={styles['post-desc']}>{props.post.content}</p>
      <div className={styles['post-actions']}>
        <p className={`${styles['post-action']} ${styles['post-delete']}`}>
          <a href="#" onClick={props.onDelete}>
            <FormattedMessage id="deletePost" />
          </a>
        </p>
        <p className={styles['post-action']}>
          <a href="#" onClick={() => showComments(props.post.cuid)}>
            <FormattedMessage id={props.post.cuid === openedCommentId ? 'hideComments' : 'showComments'} />
          </a>
        </p>
      </div>
      {
        isCommentAddingFormOpen === true && <CommentCreateWidget
          addComment={(authorName, content) => props.handleAddComment(authorName, content, props.post.cuid)}
          closeForm={() => openCommentsForm(false)}
        />
      }
      {
        props.post.cuid === openedCommentId && <CommentsList comments={props.comments} />
      }
      <hr className={styles.divider} />
    </div>
  );
};

PostListItem.propTypes = {
  post: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape({
    content: PropTypes.string.isRequired,
    createdBy: PropTypes.string.isRequired,
  })).isRequired,
  onDelete: PropTypes.func.isRequired,
  handleAddComment: PropTypes.func.isRequired,
  handleFetchComments: PropTypes.func.isRequired,
};

export default PostListItem;
