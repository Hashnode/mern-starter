import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from '../../components/PostListItem/PostListItem.css';

// Import Actions
import { fetchPost } from '../../PostActions';
import { addCommentRequest, fetchComments, deleteCommentRequest, editComment, updateCommentRequest } from '../../CommentActions';

// Import Selectors
import { getPost } from '../../PostReducer';
import { getComments } from '../../CommentReducer';

// Import Components
import { CommentCreateWidget } from '../../components/CommentCreateWidget/CommentCreateWidget';
import CommentList from '../../components/CommentList';

class PostDetailPage extends Component {
  componentDidMount() {
    this.props.dispatch(fetchComments(this.props.post.cuid));
  }

  handleOnEdit = cuid => {
    this.props.dispatch(editComment(cuid));
  }

  handleAddComment = (author, content) => {
    this.props.dispatch(addCommentRequest({ author, content }, this.props.post.cuid));
  }

  handleOnUpdate = (cuid, content) => {
    this.props.dispatch(updateCommentRequest({ cuid, content }));
  }

  handleDeleteComment = comment => {
    if (confirm('Do you want to delete this comment')) { // eslint-disable-line
      this.props.dispatch(deleteCommentRequest(comment));
    }
  };
  render() {
    return (
      <div>
        <Helmet title={this.props.post.title} />
        <div className={`${styles['single-post']} ${styles['post-detail']}`}>
          <h3 className={styles['post-title']}>{this.props.post.title}</h3>
          <p className={styles['author-name']}><FormattedMessage id="by" /> {this.props.post.name}</p>
          <p className={styles['post-desc']}>{this.props.post.content}</p>
        </div>
        <CommentCreateWidget addComment={this.handleAddComment} />
        <CommentList comments={this.props.comments} handleOnUpdate={this.handleOnUpdate} handleOnEdit={this.handleOnEdit} handleDeleteComment={this.handleDeleteComment} />
      </div>
    );
  }
}

// Actions required to provide data for this component to render in server side.
PostDetailPage.need = [params => {
  return fetchPost(params.cuid);
}];

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    comments: getComments(state),
    post: getPost(state, props.params.cuid),
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
  comments: PropTypes.shape({
    author: PropTypes.isRequired,
    content: PropTypes.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(PostDetailPage);
