import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './CommentList.css';

// Import Components
import CommentListItem from '../CommentListItem/CommentListItem';
import CommentCreateWidget from '../CommentCreateWidget/CommentCreateWidget';

// Import Actions
import {
  addCommentRequest,
  fetchComments,
  deleteCommentRequest,
  editCommentRequest,
} from '../../CommentActions';
import { toggleAddCommentModal, toggleEditCommentModal } from '../../../App/AppActions';

// Import Selectors
import { getShowAddComment, getShowEditComment } from '../../../App/AppReducer';
import { getComments, getComment } from '../../CommentReducer';

class CommentList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comment: null,
    };

    this.handleAddCommentModal = this.handleAddCommentModal.bind(this);
    this.handleEditCommentModal = this.handleEditCommentModal.bind(this);

    this.handleAddComment = this.handleAddComment.bind(this);
    this.handleDeleteComment = this.handleDeleteComment.bind(this);
    this.handleEditComment = this.handleEditComment.bind(this);
  }

  componentDidMount() {
    this.props.fetchComments(this.props.postCuid);
  }

  handleAddCommentModal() {
    this.setState({
      comment: {
        name: '',
        content: '',
        postCuid: this.props.postCuid,
      },
    });

    this.props.toggleAddCommentModal();
  }

  handleAddComment(comment) {
    this.props.addCommentRequest(comment);
    this.props.toggleAddCommentModal();
  }

  handleEditCommentModal(e) {
    this.setState({
      comment: getComment(this.props.comments, e.currentTarget.dataset.cuid),
    });

    this.props.toggleEditCommentModal();
  }

  handleEditComment(comment) {
    this.props.editCommentRequest(comment);
    this.props.toggleEditCommentModal();
  }

  handleDeleteComment(e) {
    if (confirm('Do you want to delete this post')) { // eslint-disable-line
      this.props.deleteCommentRequest(e.currentTarget.dataset.cuid);
    }
  }

  render() {
    return (
      <div className={styles.wrapper}>
        {
          this.props.showAddComment || this.props.showEditComment ? (
            <CommentCreateWidget
              type={this.props.showEditComment ? 'edit' : 'add'}
              comment={this.state.comment}
              onSuccess={
                this.props.showEditComment
                  ? this.handleEditComment
                  : this.handleAddComment
              }
              onClose={
                this.props.showEditComment
                  ? this.props.toggleEditCommentModal
                  : this.props.toggleAddCommentModal
              }
            />
          ) : (
            <button onClick={this.handleAddCommentModal} className={`${styles['success-button']} ${styles['comment-button']}`}>
              <FormattedMessage id="addComment" />
            </button>
          )
        }
        {
          this.props.comments.length ? (
            <div className={styles.list}>
              <h3 className={styles.title}>
                <FormattedMessage id="commentsHeader" />
              </h3>
              {
                this.props.comments.map(comment => (
                  <CommentListItem
                    comment={comment}
                    key={comment.cuid}
                    onDelete={this.handleDeleteComment}
                    onEdit={this.handleEditCommentModal}
                  />
                ))
              }
            </div>
          ) : null
        }
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
CommentList.need = [() => fetchComments()];

const mapStateToProps = state => ({
  showAddComment: getShowAddComment(state),
  showEditComment: getShowEditComment(state),
  comments: getComments(state),
});

CommentList.propTypes = {
  postCuid: PropTypes.string.isRequired,
  showAddComment: PropTypes.bool.isRequired,
  showEditComment: PropTypes.bool.isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    postCuid: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
    dateAdded: PropTypes.string.isRequired,
  })).isRequired,
  addCommentRequest: PropTypes.func.isRequired,
  fetchComments: PropTypes.func.isRequired,
  deleteCommentRequest: PropTypes.func.isRequired,
  editCommentRequest: PropTypes.func.isRequired,
  toggleAddCommentModal: PropTypes.func.isRequired,
  toggleEditCommentModal: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  {
    addCommentRequest,
    fetchComments,
    deleteCommentRequest,
    editCommentRequest,
    toggleAddCommentModal,
    toggleEditCommentModal,
  }
)(CommentList);
