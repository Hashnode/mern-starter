import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

// Import Components
import PostCommentsList from '../PostCommentsList';

// Import Style
import styles from './PostComments.css';

function PostComments(props) {
  const comments = props.comments
  const commentsLength = props.comments.length
  return (
    <div>
      <p>Comments ({commentsLength})</p>
      <hr/>
      <PostCommentsList comments={comments} />
    </div>
  );
}

PostComments.propTypes = {
  comments: PropTypes.array.isRequired
};

export default PostComments;
