import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './PostListItem.css';
import cssModules from 'react-css-modules';

function PostListItem(props) {
  return (
    <div styleName="single-post">
      <h3 styleName="post-title ">
        <Link to={`/post/${props.post.slug}-${props.post.cuid}`} onClick={props.onClick}>
          {props.post.title}
        </Link>
      </h3>
      <p styleName="author-name">By {props.post.name}</p>
      <p styleName="post-desc">{props.post.content}</p>
      <p styleName="post-action"><a href="#" onClick={props.onDelete}>Delete Post</a></p>
      <hr styleName="divider"/>
    </div>
  );
}

PostListItem.propTypes = {
  post: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,

  onClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default cssModules(PostListItem, styles);
