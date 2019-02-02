import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { deleteComment } from '../../CommentActions';
import { toggleAddComment } from '../../../App/AppActions';
import CommentEdit from '../../CommentEdit/CommentEdit';

// Import Style
import styles from './CommentListItem.css';

export class CommentListItemA extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  handleDeleteComment() {
    if (confirm('Do you want to delete this comment')) { this.props.deleteComment(this.props.comment.commentId); }
  }
  handlechangeShowBtnt() { this.props.toggleAddComment(); }

  render() {
    return (
      <div className={styles['single-comment']}>
        <hr className={styles.divider} />
        <p className={styles['author-name']}><FormattedMessage id="by" />{this.props.comment.name}</p>
        <p className={styles['comment-desc']}>{this.props.comment.content}</p>
        <p className={styles['comment-action']}><a href="#" onClick={this.handleDeleteComment()}><FormattedMessage id="deleteComment" /></a></p>
        <p className={styles['comment-action']}><a href="#" onClick={this.handlechangeShowBtnt()}><FormattedMessage id="editComment" /></a></p>
        <CommentEdit comment={this.props.comment} />
      </div>
		);
  }
}
CommentListItemA.propTypes = {
  comment: PropTypes.shape({
    content: PropTypes.string.isRequired,
    commentId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  toggleAddComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
};


const mapStateToProps = state => ({ showAddComment: state.app.showAddComment, messages: state.intl.messages });
const mapDispatchToProps = { deleteComment, toggleAddComment };
const CommentListItem = connect(mapStateToProps, mapDispatchToProps)(CommentListItemA);
export default CommentListItem;
