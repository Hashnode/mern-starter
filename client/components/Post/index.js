import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Post = ({ post }) => (
  <div>
    <Link to={`/${post._id}`} href={`${post._id}`}>
      <h2>{post.title}</h2>
    </Link>
    <pre>
      {post.content}
    </pre>
  </div>
);

Post.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
};

export default Post;
