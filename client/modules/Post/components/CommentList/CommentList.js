import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FormattedMessage } from 'react-intl';

// Components
import CommentListItem from '../CommentListItem/CommentListItem';
import CommentCreateWidget from '../CommentCreateWidget/CommentCreateWidget';

// Selectors
import { getComments, getAuthor } from '../../PostReducer';

// Actions
import { addComment, editComment, deleteComment } from '../../PostActions';

import styles from './CommentList.css';

class Comments extends React.Component {
  handlerDeleteComment = id => {
    if (confirm(this.props.intl.messages.deleteCommentMessage)) { // eslint-disable-line
      this.props.handlerDeleteComment({ cuid: this.props.cuid, id });
    }
  };

  handlerEditComment = (id, comment) => {
    if (confirm(this.props.intl.messages.editCommentMessage)) { // eslint-disable-line
      this.props.handlerEditComment({ cuid: this.props.cuid, id, comment });
    }
  };

  handlerAddComment = comment => {
    this.props.handlerAddComment({
      cuid: this.props.cuid,
      comment: {
        body: comment,
        author: this.props.author,
        dateAdded: new Date().toISOString(),
      },
    });
  };

  render() {
    const {
      comments,
    } = this.props;

    return (
      <div className={styles.comments}>
        <h3 className={styles.comments_header}><FormattedMessage id="comments" /></h3>
        <CommentCreateWidget addComment={this.handlerAddComment} />
        <div className={styles.comments_body}>
          {
            comments.map(comment =>
              <CommentListItem
                key={comment.id}
                comment={comment}
                onDeleteComment={() => this.handlerDeleteComment(comment.id)}
                onEditComment={this.handlerEditComment.bind(this, comment.id)}
                isOwner={comment.author === this.props.author}
              />
            )
          }
        </div>
      </div>
    );
  }
}

Comments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    dateAdded: PropTypes.string.isRequired,
  }).isRequired),
  cuid: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  handlerAddComment: PropTypes.func.isRequired,
  handlerDeleteComment: PropTypes.func.isRequired,
  handlerEditComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => {
  return {
    comments: getComments(state, props.cuid),
    author: getAuthor(state),
    intl: state.intl,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  handlerAddComment: addComment,
  handlerDeleteComment: deleteComment,
  handlerEditComment: editComment,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
