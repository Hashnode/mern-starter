import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from '../../components/PostListItem/PostListItem.css';

// Import components
import CommentList from '../../../Comment/components/CommentList';
import CommentCreator from '../../../Comment/components/CommentCreator/CommentCreator';

// Import Actions
import { fetchPost } from '../../PostActions';
import { getCommentsByPost, addComment, deleteComment } from '../../../Comment/CommentActions';

// Import Selectors
import { getPost } from '../../PostReducer';
import { getComments } from '../../../Comment/CommentReducer';

export function PostDetailPage(props) {
  function fetchComments() {
    // eslint-disable-next-line react/prop-types
    return props.getCommentsByPost(props.post.cuid);
  }

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div>
      <Helmet title={props.post.title} />
      <div className={`${styles['single-post']} ${styles['post-detail']}`}>
        <h3 className={styles['post-title']}>{props.post.title}</h3>
        <p className={styles['author-name']}><FormattedMessage id="by" /> {props.post.name}</p>
        <p className={styles['post-desc']}>{props.post.content}</p>
      </div>
      <CommentCreator handleAdd={props.addComment} post={props.post.cuid} />
      <CommentList data={props.comments} handleDelete={props.deleteComment} />
    </div>
  );
}

// Actions required to provide data for this component to render in server side.
PostDetailPage.need = [params => {
  return fetchPost(params.cuid);
}];

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    post: getPost(state, props.params.cuid),
    comments: getComments(state),
  };
}

PostDetailPage.propTypes = {
  post: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
    post: PropTypes.string.isRequired,
  })),
  addComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { getCommentsByPost, addComment, deleteComment })(PostDetailPage);
