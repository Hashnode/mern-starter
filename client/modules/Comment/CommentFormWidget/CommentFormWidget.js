import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';

// Import styles
import styles from './CommentFormWidget.css';

// Import components
import CommentForm from '../components/CommentForm/CommentForm';

// Import actions
import { addCommentRequest, deleteCommentRequest, editCommentRequest } from '../CommentsActions';
import { withRouter } from 'react-router';

export class CommentFormWidget extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: !!props.initialValues,
      isFormShown: false,
      comment: props.initialValues,
    };
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.initialValues && this.props.initialValues &&
      (prevProps.initialValues.author !== this.props.initialValues.author ||
        prevProps.initialValues.content !== this.props.initialValues.content)
    ) {
      this.refreshComment();
    }
  }

  showForm = () => this.setState({ isFormShown: true });

  closeForm = () => this.setState(
    { isFormShown: false },
    () => {
      if (this.props.onClose) {
        this.props.onClose();
      }
    },
  );

  refreshComment = () => this.setState({ comment: this.props.initialValues });

  handleFormSubmit = (formData) => {
    const { editComment, addComment, submitCallback, params } = this.props;
    const { cuid: postId } = params;
    if (!postId) {
      formData.reject('PostId should be specified.');
      return;
    }

    const payload = { ...formData, postId };

    if (this.state.editMode) {
      editComment(payload);
    } else {
      addComment(payload);
    }
    if (submitCallback) {
      submitCallback();
    }
    this.closeForm();
  };

  render() {
    const initialValues = this.state.comment || { author: '', content: '' };
    return this.props.inline || this.state.isFormShown ? (
      <div className={`${styles.container} ${this.props.inline ? styles.inline : ''}`}>
        <CommentForm
          inline={this.props.inline}
          onClose={this.closeForm}
          initialValues={initialValues}
          onSubmit={this.handleFormSubmit}
        />
      </div>
    ) : <button className={`btn ${styles['show-btn']}`} onClick={this.showForm}>
      <FormattedMessage id={this.state.editMode ? 'editComment' : 'addComment'} />
    </button>;
  }
}

CommentFormWidget.propTypes = {
  initialValues: PropTypes.shape({
    author: PropTypes.string,
    content: PropTypes.string,
    commentId: PropTypes.string,
  }),
  onClose: PropTypes.func,
  inline: PropTypes.bool,
  addComment: PropTypes.func,
  editComment: PropTypes.func,
  submitCallback: PropTypes.func,
  params: PropTypes.object,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  addComment: (comment) => dispatch(addCommentRequest(comment)),
  editComment: (comment) => dispatch(editCommentRequest(comment)),
  deleteComment: (commentId) => dispatch(deleteCommentRequest(commentId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(withRouter(CommentFormWidget)));
