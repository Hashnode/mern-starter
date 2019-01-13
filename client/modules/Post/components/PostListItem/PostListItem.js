import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import CommentListItem from '../CommentListItem/CommentListItem';

// Import Style
import styles from './PostListItem.css';

function PostListItem(props) {
  const { post, onDelete, onCreateComment, showAddComment, comments, onDeleteComment, onEditComment, showEditComment } = props;
  return (
    <div className={styles['single-post']}>
      <h3 className={styles['post-title']}>
        <Link to={`/posts/${post.slug}-${post.cuid}`}>{post.title}</Link>
      </h3>
      <p className={styles['author-name']}>
        <FormattedMessage id="by" /> {post.name}
      </p>
      <p className={styles['post-desc']}>{post.content}</p>
      <p className={styles['post-action']}>
        <a href="#" onClick={onDelete}>
          <FormattedMessage id="deletePost" />
        </a>
      </p>
      <p className={styles['post-action']}>
        <Link
          to={`/posts/${post._id}`}
          onClick={() => onCreateComment(post._id)}
        >
          <FormattedMessage id={`${showAddComment ? 'hideCommentForm' : 'createComment'}`} />
        </Link>
      </p>
      {
        <div className="listView">
        {comments !== undefined ?
          comments.map(comment => (
            <CommentListItem
              comment={comment}
              key={comment._id}
              onDeleteComment={() => onDeleteComment({ postID: post._id, commentID: comment._id })}
              onEditComment={() => onEditComment({ postID: post._id, commentID: comment._id })}
              showAddComment={showAddComment}
              showEditComment={showEditComment}
              postID={post._id}
            />
            )) :
            ''
          }
        </div>
      }
      <hr className={styles.divider} />
    </div>
  );
}

PostListItem.propTypes = {
  post: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onCreateComment: PropTypes.func.isRequired,
  onEditComment: PropTypes.func.isRequired,
  onDeleteComment: PropTypes.func.isRequired,
  showAddComment: PropTypes.bool.isRequired,
  showEditComment: PropTypes.bool.isRequired,
  comments: PropTypes.array,
};

export default PostListItem;
