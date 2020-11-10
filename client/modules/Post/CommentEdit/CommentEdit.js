import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { addComment, deleteComment } from '../CommentActions';
import { toggleAddComment } from '../../App/AppActions';
import styles from './CommentEdit.css';

export class CommentEditA extends Component {
  editComment() {
    this.props.toggleAddComment();
    const nameRef = this.refs.name;
    const contentRef = this.refs.content;
    if (nameRef.value && contentRef.value && this.props.comment.commentId) {
      const comment = { postId: this.props.comment.postId, name: nameRef.value, content: contentRef.value, commentId: this.props.comment.commentId };
      this.props.deleteComment(this.props.comment.commentId);
      this.props.addComment(comment);
      nameRef.value = contentRef.value = '';
    }
  }

  render() {
    const cls = `${styles.form} ${(this.props.showAddComment ? styles.appear : '')}`;
    if (this.props.showAddComment) {
      this.refs.name.value = this.props.comment.name;
      this.refs.content.value = this.props.comment.content;
    }
    return (
      <div>
        <div className={cls}>
          <div className={styles['form-content']}>
            <h2 className={styles['form-title']}><FormattedMessage id="editComment" /></h2>
            <input className={styles['form-field']} ref="name" />
            <textarea className={styles['form-field']} ref="content" />
            <a className={styles['post-cancel-button']} href="#" onClick={() => this.props.toggleAddComment()}><FormattedMessage id="cancel" /></a>
            <a className={styles['post-submit-button']} href="#" onClick={() => this.editComment()}><FormattedMessage id="submit" /></a>
          </div>
        </div>
      </div>
    );
  }
}

CommentEditA.propTypes = {
  comment: PropTypes.shape({
    postId: PropTypes.string.isRequired,
    commentId: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  toggleAddComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  showAddComment: PropTypes.bool.isRequired,
};


const mapStateToProps = state => ({ showAddComment: state.app.showAddComment, messages: state.intl.messages });
const mapDispatchToProps = { addComment, deleteComment, toggleAddComment };
const CommentEdit = connect(mapStateToProps, mapDispatchToProps)(CommentEditA);
export default CommentEdit;
