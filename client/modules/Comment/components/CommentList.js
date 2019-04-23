import React from 'react';
import PropTypes from 'prop-types';

import CommentItem from './CommentItem/CommentItem';

import styles from './CommentList.css';

function CommentList(props) {
  return (
    <div
      className={`${styles['comment-container']}`}
    >
        {props.data ? props.data.map(comment => (
          <CommentItem
            key={comment.cuid}
            data={comment}
            handleDelete={props.handleDelete}
          />
    )) : <p>Download...</p>}
    </div>
  );
}

CommentList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
    post: PropTypes.string.isRequired,
  })),
  handleDelete: PropTypes.func.isRequired,
};

export default CommentList;
