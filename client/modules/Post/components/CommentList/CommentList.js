import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

// Import style
import styles from './CommentList.css';

// Import Components
import CommentListItem from '../CommentListItem/CommentListItem';
import CommentFormWidget from '../CommentFormWidget/CommentFormWidget';

// Import Redux Actions
import { addCommentRequest, editCommentRequest, deleteCommentRequest } from '../../CommentsActions';

class CommentList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      comment: {
        commentId: null,
        author: null,
        content: null,
      },
      isFormShown: false,
    };
  }

  handleCommentChange = (e) => this.setState(prevState => ({
    ...prevState,
    comment: {
      ...prevState.comment,
      [e.target.name]: e.target.value,
    },
  }));

  handleCommentSubmit = (e) => {
    e.preventDefault();
    if (this.state.comment.commentId) {
      this.props.addComment(this.state.comment);
    }
  };

  toggleForm = () => this.setState(prevState => ({ isFormShown: !prevState.isFormShown }));

  render() {
    const { comments, addComment, editComment, deleteComment } = this.props;
    const { isFormShown } = this.state;
    return (
      <div className={styles.container}>
        {comments && comments.length ? comments.map(comment => (
          <CommentListItem
            comment={comment}
            editComment={editComment}
            deleteComment={deleteComment}
          />
          )) : (<FormattedMessage id="emptyComments" />)}
        <div className={styles.actions}>
          <button type="button" onClick={this.toggleForm}>
            <FormattedMessage id="addComment" />
          </button>
        </div>
        {isFormShown && (
          <CommentFormWidget
            initialValues={this.state.comment}
            addComment={addComment}
            onChange={this.handleCommentChange}
            onSubmit={this.handleCommentSubmit}
          />
        )}
      </div>
    );
  }
}

CommentList.propTypes = {
  comments: PropTypes.array,
  addComment: PropTypes.func.isRequired,
  editComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  addComment: (comment) => dispatch(addCommentRequest(comment)),
  editComment: (comment) => dispatch(editCommentRequest(comment)),
  deleteComment: (commentId) => dispatch(deleteCommentRequest(commentId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);
