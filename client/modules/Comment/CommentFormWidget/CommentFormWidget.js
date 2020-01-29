import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';

// Import styles
import styles from './CommentFormWidget.css';

// Import actions
import { addCommentRequest, deleteCommentRequest, editCommentRequest } from '../CommentsActions';
import { toggleCommentForm } from '../../App/AppActions';

// import selectors
import { selectIsCommentFormShown } from '../../App/AppReducer';


class CommentFormWidget extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isFormShown: false,
    };
  }

  showForm = () => this.setState({ isFormShown: true });

  closeForm = () => this.setState({ isFormShown: false });

  renderForm = () => {
    const { intl } = this.context;
    const { initialValues, onChange, onSubmit } = this.props;
    const { author, content } = initialValues || {};

    return (
      <form onSubmit={onSubmit} className={styles.container}>
        <label htmlFor="author">
          <FormattedMessage id="commentForm.author.label" />
        </label>
        <input
          type="text"
          name="author"
          value={author || ''}
          placeholder={intl.formatMessage({ id: 'commentForm.author.placeholder' })}
          onChange={e => onChange(e)}
        />
        <label htmlFor="content">
          <FormattedMessage id="commentForm.content.label" />
        </label>
        <textarea
          name="content"
          value={content || ''}
          placeholder={intl.formatMessage({ id: 'commentForm.content.placeholder' })}
          onChange={e => onChange(e)}
        />
        <button type="submit">
          <FormattedMessage id="submit" />
        </button>
      </form>
    );
  };

  render() {
    return this.state.isFormShown ? (
      <div className={styles['comment-form-wrapper']}>
        <span className={styles['close-btn']} onClick={this.closeForm} />
        {this.renderForm()}
      </div>
    ) : <button className={styles['add-comment']} onClick={this.showForm}>
      Add comment
    </button>;
  }
}

CommentFormWidget.defaultProps = {
  initialValues: {
    author: '',
    content: '',
    commentId: '',
  },
};

CommentFormWidget.propTypes = {
  initialValues: PropTypes.shape({
    author: PropTypes.string,
    content: PropTypes.string,
    commentId: PropTypes.string,
  }),
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  toggleForm: PropTypes.func,
  addComment: PropTypes.func,
  editComment: PropTypes.func,
  deleteComment: PropTypes.func,
};

CommentFormWidget.contextTypes = {
  intl: PropTypes.object,
};

const mapStateToProps = state => ({
  showCommentForm: selectIsCommentFormShown(state),
});

const mapDispatchToProps = dispatch => ({
  toggleForm: () => dispatch(toggleCommentForm()),
  addComment: (comment) => dispatch(addCommentRequest(comment)),
  editComment: (comment) => dispatch(editCommentRequest(comment)),
  deleteComment: (commentId) => dispatch(deleteCommentRequest(commentId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(CommentFormWidget));
