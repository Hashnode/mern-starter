import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

import CommentAddForm from '../CommentAddForm';

import {
  commentFormForPostOpen,
  commentRemoveRequest,
} from '../../PostActions';
import { isVommentFormVisibleInPostSelector } from '../../PostSelectors';

// Import Style
import styles from './PostListItem.css';

const PostListItem = ({
  post,
  onDelete,
  isAddFormVisible,
  addFormOpen,
  removeComment,
}) => {
  function removeCommentHandler(commentId) {
    if (confirm('Do you want to delete this comment')) { // eslint-disable-line
      removeComment(commentId, post._id);
    }
  }

  return (
    <div className={styles['single-post']}>
      <h3 className={styles['post-title']}>
        <Link to={`/posts/${post.slug}-${post.cuid}`} >
          {post.title}
        </Link>
      </h3>
      <p className={styles['author-name']}>
        <FormattedMessage id="by" /> {post.name}
      </p>

      <p className={styles['post-desc']}>
        {post.content}
      </p>
      <p className={styles['post-action']}>
        <a
          href="#"
          onClick={onDelete}
        >
          <FormattedMessage id="deletePost" />
        </a>
        <a
          onClick={addFormOpen}
          className={styles['post-item--add-comment']}
        >
          <FormattedMessage
            id="addComment"
          />
        </a>
      </p>

      {
        isAddFormVisible && (
          <CommentAddForm
            postId={post._id}
          />
        )
      }

      {
        !!post.comments.length && post.comments.map(({
          authorName,
          comment,
          _id,
        }) => (
          <div
            className={styles['comment-block']}
            key={_id}
          >
            <div className={styles['comment-content']}>{comment}</div>
            <div>
              <FormattedMessage id="commentAuthor" />: {authorName}
            </div>
            <div
              className={styles['comment-remove']}
              onClick={() => removeCommentHandler(_id)}
            >
              &times;
            </div>
          </div>
        ))
      }
      <hr className={styles.divider} />
    </div>
  );
};

PostListItem.propTypes = {
  isAddFormVisible: PropTypes.bool.isRequired,
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
    comments: PropTypes.arrayOf(PropTypes.shape({
      authorName: PropTypes.string.isRequired,
      comment: PropTypes.string.isRequired,
      postId: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  addFormOpen: PropTypes.func.isRequired,
  removeComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => ({
  isAddFormVisible: isVommentFormVisibleInPostSelector(state, props),
});

const mapDispatchToProps = (dispatch, props) => ({
  addFormOpen: () => dispatch(commentFormForPostOpen(props.post._id)),
  removeComment: (commentId, postId) =>
    dispatch(commentRemoveRequest(commentId, postId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostListItem);
