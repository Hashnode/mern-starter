import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { getPostRequest } from '../../PostActions';
import Helmet from 'react-helmet';

function PostDetailPage(props) {
  return (
    <div>
      <Helmet title={props.post.title} />
        <div className="single-post post-detail">
          <h3 className="post-title">{props.post.title}</h3>
          <p className="author-name">By {props.post.name}</p>
          <p className="post-desc">{props.post.content}</p>
        </div>
    </div>
  );
}

PostDetailPage.need = [(params) => {
  return getPostRequest.bind(null, params.slug)();
}];

PostDetailPage.propTypes = {
  post: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(store) {
  return {
    post: store.posts.post,
  };
}

export default connect(mapStateToProps)(PostDetailPage);
