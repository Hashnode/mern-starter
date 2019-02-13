import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchComments, createComment } from '../CommentActions';
import { getComments } from '../CommentReducer';
import CommentForm from './CommentForm';
import CommentsList from './CommentsList';

class CommentsWidget extends PureComponent {
  static propTypes = {
    comments: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    postId: PropTypes.string.isRequired,
  };

  state = {
    commentsDownloaded: false,
  };

  handleClick = () => {
    const { dispatch, postId } = this.props;
    dispatch(fetchComments(postId)).then(() => this.setState({
      commentsDownloaded: true,
    }));
  }

  handleSubmit = (author, text) => {
    const { postId: relatedPost, dispatch } = this.props;
    return dispatch(createComment({ author, text, relatedPost }));
  }

  render() {
    const { commentsDownloaded } = this.state;
    const { comments } = this.props;
    const clearOnSubmit = true;

    return (
      <div className="comments-widget">
        {
          !commentsDownloaded ? (
            <div className="comments-toggle">
              <button type="button" onClick={this.handleClick}>Show comments</button>
            </div>
          ) :
            (<div className="content">
              <CommentForm onSubmit={this.handleSubmit} clearStateOnSubmit={clearOnSubmit} />
              <CommentsList comments={comments} />
            </div>)
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    comments: getComments(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentsWidget);
