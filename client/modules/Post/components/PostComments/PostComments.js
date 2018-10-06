import React from 'react';
import PropTypes from 'prop-types';

// Import Components
import PostCommentsList from '../PostCommentsList';
import PostCommentsForm from '../PostCommentsForm/PostCommentsForm';

// Import Style
import styles from './PostComments.css';

function PostComments(props) {
  const comments = props.comments;
  const commentsLength = props.comments.length;
  return (
    <div>
      <p className={styles['header']}>Comments ({commentsLength})</p>
      <hr />
      <PostCommentsForm onSubmit={props.addComment}/>
      <PostCommentsList comments={comments} />
    </div>
  );
}

PostComments.propTypes = {
  comments: PropTypes.array.isRequired,
};

export default PostComments;
