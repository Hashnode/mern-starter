import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CommentListItem from './CommentListItem/CommentListItem';

export const CommentListA = props => {
  const commentPost = props.comments.filter(comment => props.postId === comment.postId);
  return (
    <div className="listView">
      {
        commentPost.map(comment => (
          <CommentListItem
            postId={props.postId}
            comment={comment}
            key={comment.commentId}
          />
        ))
      }
    </div>
  );
};

CommentListA.propTypes = {
  postId: PropTypes.string.isRequired,
  comments: PropTypes.array,
};

const mapStateToProps = state => ({ comments: state.comments.data });
const CommentList = connect(mapStateToProps)(CommentListA);
export default CommentList;
