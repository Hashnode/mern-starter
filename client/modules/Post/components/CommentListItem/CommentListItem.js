import React from 'react';
import PropTypes from 'prop-types';

// Import style
import styles from './CommentListItem.css';

const CommentListItem = () => (
  <div className={styles.container}>

  </div>
);

CommentListItem.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.string,
  }),
  onReply: PropTypes.func,
  onEdit: PropTypes.func,
};

export default CommentListItem;
