import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Post = ({ post, deleteHandler }) => (
  <div>
    <Link to={`/${post.slug}`} href={`${post.slug}`}>
      <h2>{post.title}</h2>
    </Link>
    <button onClick={() => { deleteHandler(post.slug); }}>Delete Post</button>
    <pre>
      {post.content}
    </pre>
  </div>
);

Post.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string,
    content: PropTypes.string,
  }).isRequired,
  deleteHandler: PropTypes.func.isRequired,
};

export default Post;
