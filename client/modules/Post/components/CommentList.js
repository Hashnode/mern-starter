import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Import Components
import CommentListItem from './CommentListItem/CommentListItem';

export class CommentListA extends Component {
  render() {
    const commentPost = this.props.comments.filter(comment => this.props.postId === comment.postId);
    return (
      <div className="listView">
        {
          commentPost.map(comment => (
            <CommentListItem
              comment={comment}
              key={comment.commentId}
            />
          ))
        }
      </div>
    );
  }
}
CommentListA.propTypes = {
  postId: PropTypes.string.isRequired,
  comments: PropTypes.array,
};

const mapStateToProps = state => ({ comments: state.comments.data });
const mapDispatchToProps = {};
const CommentList = connect(mapStateToProps, mapDispatchToProps)(CommentListA);
export default CommentList;
