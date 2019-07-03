import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';

// Import Components
import PostComments from '../../components/PostComments/PostComments';

// Import Style
import styles from '../../components/PostListItem/PostListItem.css';

// Import Actions
import { fetchPost } from '../../PostActions';
import { addCommentRequest, fetchComments } from '../../CommentActions';

// Import Selectors
import { getPost } from '../../PostReducer';
import { getComments } from '../../CommentReducer';

class PostDetailPage extends Component {
  
  componentDidMount() {
    this.props.dispatch(fetchComments(this.props.params.cuid));
  }

  handleAddComment = (author, text) => {
    this.props.dispatch(addCommentRequest({ post_id: this.props.params.cuid, author, text }));
  };

  render() {
    const props = this.props;

    return (
      <div>
        <Helmet title={props.post.title} />
        <div className={`${styles['single-post']} ${styles['post-detail']}`}>
          <h3 className={styles['post-title']}>{props.post.title}</h3>
          <p className={styles['author-name']}><FormattedMessage id="by" /> {props.post.name}</p>
          <p className={styles['post-desc']}>{props.post.content}</p>        
          <PostComments addComment={this.handleAddComment} comments={props.comments} />
        </div>
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
    post: getPost(state, props.params.cuid),
    comments: getComments(state),
  };
}

PostDetailPage.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  })).isRequired,
};

export default connect(mapStateToProps)(PostDetailPage);
