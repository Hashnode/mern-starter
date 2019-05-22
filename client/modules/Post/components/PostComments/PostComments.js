import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CommentForm from '../PostComments/formComponent/CommentForm';
import CommentsUser from './formComponent/CommentUser';

import styles from '../PostComments/PostComments.css';

import { addCommentRequestAPI } from '../../components/PostComments/CommentActions';

export class PostComments extends Component {

  toAddCommentToStore = (author, text) => {
    console.log(`${author}  ${text}`);
    const comment = { author, text };
    console.log(comment);

    comment.postCuid = this.props.post;
    return this.props.dispatch(addCommentRequestAPI(comment));
  }

  render() {
    const { comments } = this.props;
    return (
      <div className={`${styles['comments-list']}`}>
        <CommentForm addComment={this.toAddCommentToStore} />
        {
          comments.length ?
            comments.map((comment) => (<CommentsUser comment={comment} key={comment.cuid} />)) :
            <span>PLease, leave your comment, be first !</span>
        }
      </div>
    );
  }
}

PostComments.propTypes = {
  post: PropTypes.string.isRequired,
  comments: PropTypes.array,
  dispatch: PropTypes.func.isRequired,
};

export default connect(
  (state, props) => ({ comments: state.comments.data.filter(comment => comment.postCuid === props.post) })
)(PostComments);
