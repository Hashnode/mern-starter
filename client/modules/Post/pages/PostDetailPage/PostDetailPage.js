import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from '../../components/PostListItem/PostListItem.css';

// Import Actions
import { addCommentRequest, fetchPost, fetchComments, deleteCommentRequest, editCommentRequest } from '../../PostActions';

// Import Selectors
import { getPost } from '../../PostReducer';
import PostCommentWidget, { isEmpty } from '../../components/PostCommentWidget/PostCommentWidget';
import { PostCommentItem } from '../../components/PostCommentItem/PostCommentItem';

export class PostDetailPage extends PureComponent {
  state = {
    editable: {},
  }
  handleAddComment = (name, content, isEdit) => {
    const postId = this.props.post._id;
    if (isEdit) {
      this.props.dispatch(editCommentRequest({ name, content, postId: this.state.editable._id }));
    } else {
      this.props.dispatch(addCommentRequest({ name, content, postId }));
    }
  };

  handleDeleteComment = (comment) => {
    this.props.dispatch(deleteCommentRequest(comment));
  }

  handleEditComment = (comment) => {
    this.setState({
      editable: this.props.comments.find(el => el.cuid === comment),
    });
  }

  componentDidMount() {
    this.props.dispatch(fetchComments(this.props.post._id));
  }
  render() {
    const { post, comments } = this.props;
    return (
      <div>
        <Helmet title={post.title} />
        <div className={`${styles['single-post']} ${styles['post-detail']}`}>
          <h3 className={styles['post-title']}>{post.title}</h3>
          <p className={styles['author-name']}><FormattedMessage id="by" /> {post.name}</p>
          <p className={styles['post-desc']}>{post.content}</p>
          <div>
            {
              comments.map((comment, i) =>
                <PostCommentItem
                  key={i}
                  {...comment}
                  deleteComment={this.handleDeleteComment}
                  editComment={this.handleEditComment}
                />
                  )
            }
          </div>
          <h3>{isEmpty(this.state.editable) ? 'Add new comment' : 'edit comment'}</h3>
          <br />
          <PostCommentWidget
            addComment={this.handleAddComment}
            edit={this.state.editable}
          />
        </div>
      </div>
    );
  }
}

// Actions required to provide data for this component to render in server side.
PostDetailPage.need = [params => {
  return fetchPost(params.cuid);
},
];

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    post: getPost(state, props.params.cuid),
    comments: state.posts.comments,
  };
}

PostDetailPage.propTypes = {
  post: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,

};

export default connect(mapStateToProps)(PostDetailPage);
