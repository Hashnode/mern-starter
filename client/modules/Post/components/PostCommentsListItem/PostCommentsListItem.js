import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

// Import Style
import styles from './PostCommentsListItem.css';

function PostCommentsListItem(props) {
  return (
    <div className={styles['comment-block']}>
        <p className={styles['author']}>{props.author}</p>
        <p>{props.comment}</p>
    </div>
  );
}

PostCommentsListItem.propTypes = {
    author: PropTypes.string.isReqiured,
    comment: PropTypes.string.isReqiured
};

export default PostCommentsListItem;
