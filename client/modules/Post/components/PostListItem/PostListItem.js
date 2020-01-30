import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './PostListItem.css';

function PostListItem(props) {
  return (
    <div className={styles['single-post']}>
      <h3 className={styles['post-title']}>
        <Link to={`/posts/${props.post.slug}-${props.post.cuid}`} >
          {props.post.title}
        </Link>
      </h3>
      <p className={styles['author-name']}><FormattedMessage id="by" /> {props.post.name}</p>
      <p className={styles['post-desc']}>{props.post.content}</p>
      <p className={styles['post-comments']}>
        <FormattedMessage
          id={'comment'}
          values={{
            name: props.post.name,
            value: props.post.comments ? props.post.comments.length : 0,
          }}
        />
        <Link to={`/posts/${props.post.slug}-${props.post.cuid}`} >
          <FormattedMessage id="makeComment" values={{ count: props.post.comments ? props.post.comments.length : 0 }} />
        </Link>
      </p>
      <p className={styles['post-action']}><a href="#" onClick={props.onDelete}><FormattedMessage id="deletePost" /></a></p>
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
    comments: PropTypes.array,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default PostListItem;
