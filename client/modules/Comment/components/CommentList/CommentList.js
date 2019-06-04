import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

// call api for getting comments data
import callApi from '../../../../util/apiCaller';

// Import Styles
import styles from './CommentList.css';

// Import Components
import Button from '../../../../components/Button/Button';
import CommentWidget from '../../components/CommentWidget/CommentWidget';
import CommentListItem from '../CommentListItem/CommentListItem';

class CommentList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      comments: [],
      showAddComment: false,
    };
  }

  componentDidMount() {
    this.fetchComments(this.props.postId);
  }

  fetchComments = (postId) => {
    return callApi(`posts/${postId}/comment`).then(res => {
      this.setState({ comments: res.comments });
    });
  }

  fetchComment = (id) => {
    return callApi(`comment/${id}`);
  }

  addComment = (username, content) => {
    return callApi(`posts/${this.props.postId}/comment`, 'post', {
      comment: {
        username,
        content,
      },
    }).then(res => {
      this.setState((prevState) => ({ comments: [res.comment, ...prevState.comments] }));
      this.toggleAddComment();
    });
  }

  editCommet = (id, username, content) => {
    return callApi(`comment/${id}`, 'put', {
      comment: {
        username,
        content,
      },
    });
  }

  deleteComment = (commentId) => {
    return callApi(`comment/${commentId}`, 'delete').then(() => {
      this.setState((prevState) => ({ comments: prevState.comments.filter(comment => commentId !== comment._id) }));
    });
  }

  toggleAddComment = () => {
    this.setState((prevState) => ({ showAddComment: !prevState.showAddComment }));
  }

  handleDeleteComment = (commentId) => {
    if (confirm('Do you want to delete this comment')) { // eslint-disable-line
      this.deleteComment(commentId);
    }
  };

  handleEditComment = (id, username, content) => {
    this.editCommet(id, username, content).then(res => {
      this.setState((prevState) => {
        const commentList = prevState.comments.map(commentItem => {
          if (commentItem._id === id) {
            return res.comment;
          }
          return commentItem;
        });

        return { comments: commentList };
      });
    });
  };


  render() {
    return (
      <div className="listView" >
        <h4 className={styles['list-view-title']}><FormattedMessage id="Comments" /></h4>
        {!this.state.showAddComment && <Button type="button" onClick={this.toggleAddComment}><FormattedMessage id="addComment" /></Button>}
        <CommentWidget
          isVisible={this.state.showAddComment}
          submit={this.addComment}
          cancel={this.toggleAddComment}
        />
        {
          this.state.comments.map(comment => (
            <CommentListItem
              comment={comment}
              key={comment._id}
              onDelete={() => this.handleDeleteComment(comment._id)}
              onEdit={(username, content) => this.handleEditComment(comment._id, username, content)}
            />
          ))
        }
      </div>
    );
  }
}

CommentList.propTypes = {
  postId: PropTypes.string.isRequired,
};

export default CommentList;
