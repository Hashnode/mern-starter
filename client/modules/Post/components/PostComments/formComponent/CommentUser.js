/* eslint-disable prefer-template,react/jsx-indent */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { todeleteCommentAPI } from '../CommentActions';
import styles from '../PostComments.css';
import postStyles from '../../PostListItem/PostListItem.css';

export class UserComment extends Component {
  // console.log(this.props.comment)
  // state = {
  //   author: '',
  //   text: '',
  // }

  toeditComment = () => {
    alert('NOT WORKING YET ');
  }

  render() {
    const { author, dateAdded, text, cuid } = this.props.comment;
    const commentTime = new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds();
    return (
    <div className={`${styles['form-user-comment']}`} key={cuid}>
      <div className={`${styles['comment-info']}`}>
        <span className={`${styles['comment-author']}`}>{`${author}`}</span>
        <span className={`${styles['comment-date']}`}>{`${new Date(dateAdded).toLocaleDateString()} ${commentTime}`}</span>
      </div>
      <div className={`${styles['comment-content']}`}>
{/*        {!this.editComment && <p>{text}</p>}
        {this.editComment && <textarea defaultValue={text} />}*/}
        <p>{text}</p>
      </div>
      <p className={postStyles['post-action']}><span onClick={() => this.toeditComment()}>Edit</span><span onClick={() => todeleteCommentAPI(cuid, this.props.dispatch)}>Destroy</span></p>

    </div>
  );
  }
}

UserComment.propTypes = {
  comment: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(UserComment);
