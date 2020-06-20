import React from 'react';
import PropTypes from 'prop-types';

// Import Components
import CommentListItem from './CommentListItem/CommentListItem';

const CommentList = (props) => {
  return (
    <div className="listView">
      {
        props.comments.map(comment => (
          <CommentListItem
            comment={comment}
            key={comment.cid}
          />
        ))
      }
    </div>
  );
};
//onDelete={() => props.handleDeletePost(post.cuid)}
CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({
    cid: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  })).isRequired,
};

export default CommentList;
