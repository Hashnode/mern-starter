import React, { PropTypes } from 'react';

// Previous comments block
import { PostCommentList } from './PostCommentList';

// Styles
import style from './PostCommentContainer.css';

export function PostCommentContainer(props) {
  return (
    <div className={style['comments']}>
      <hr></hr>
      <PostCommentList comments={props.comments} />
      <input
        className={style['comment-author']}
        placeholder="Enter your name, please"
      />
      <textarea
        className={style['comment-text']}
        placeholder="Enter your comment here!"
      />
      <button className={style['comment-button']}>Post comment</button>
    </div>
  );
}

PostCommentContainer.propTypes = {
  comments: PropTypes.array
};
