import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

import styles from './CommentItem.css';

function CommentItem(props) {
  return (
    <div
      className={`${styles['comment-single']}`}
      key={props.data.cuid}
    >
      <h3>{props.data.name}</h3>
      <div
        className={`${styles['comment-data']}`}
      >
        <span
          className={`${styles['comment-date']}`}
        >
          <Moment format="DD.MM.YY HH:mm">
            {props.data.date}
          </Moment>
        </span>
        <span
          className={`${styles['comment-text']}`}
        >
        {props.data.text}
        </span>
        <button
          className={`${styles['btn-edit']}`}
        >
        Edit
        </button>
        <button
          className={`${styles['btn-delete']}`}
          onClick={() => props.handleDelete(props.data.cuid)}
        >
        x
        </button>
      </div>
    </div>
  );
}

CommentItem.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }),
  handleDelete: PropTypes.func.isRequired,
};

export default CommentItem;
