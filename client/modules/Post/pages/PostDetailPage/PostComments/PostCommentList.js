import React from 'react';

import style from './PostCommentList.css';

export const PostCommentList = ({ comments }) => (
  <div className={style['prev-comments-box']}>
    {comments.map((comment, i) => (
      <div className={style['single-comment']} key={i}>
        <p><b>{comment.author}</b> says :</p>
        <div className={style['single-comment-text']}>
          {comment.text}
        </div>
      </div>
    ))}
  </div>
);

PostCommentList.propTypes = {
  comments: PropType.array.isRequired,
}

export default PostCommentList;
