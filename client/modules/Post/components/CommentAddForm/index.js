import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import CommentAddForm from './CommentAddForm'
import { authorNameSelector, commentSelector } from '../../PostSelectors';
import { addCommentRequest } from '../../PostActions';

const mapStateToProps = (state, props) => ({
  authorName: authorNameSelector(state),
  comment: commentSelector(state),
});

const mapDispatchToProps = (dispatch, props) => ({
  addComment: (authorName, comment) =>
    dispatch(addCommentRequest(authorName, comment, props.postId))
});

const Connected = connect(mapStateToProps, mapDispatchToProps)(CommentAddForm)

export default reduxForm({
  form: 'addCommentForm', // a unique identifier for this form
})(Connected);
