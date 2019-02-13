import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CommentForm from '../CommentForm';
import { updateComment, deleteComment } from '../../CommentActions';
import styles from './styles.css';

class Comment extends PureComponent {
  static propTypes = {
    comment: PropTypes.shape({
      author: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired,
    }).isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  state = {
    editFormVisible: false,
  };

  handleEditBtnClick = () => {
    this.setState({
      editFormVisible: true,
    });
  };

  handleCancelBtnClick = () => {
    this.setState({
      editFormVisible: false,
    });
  };

  handleSubmitBtnClick = (author, text) => {
    const { comment: { _id: cid }, dispatch } = this.props;
    return dispatch(updateComment({ cid, author, text })).then(() => this.setState({
      editFormVisible: false,
    }));
  }

  handleDeleteBtnClick = () => {
    const { comment, dispatch } = this.props;
    dispatch(deleteComment(comment._id));
  }

  render() {
    const { editFormVisible } = this.state;
    const { comment } = this.props;
    const updateAction = true;
    return (
      <div className={styles['comment']}>
        {
          editFormVisible ?
            (<CommentForm comment={comment} onCancel={this.handleCancelBtnClick} onSubmit={this.handleSubmitBtnClick} isUpdate={updateAction} />) : (
              <Fragment>
                <p className={styles['author']}>Author: {comment.author}</p>
                <p>{comment.text}</p>
                <div className="actions">
                  <button className={styles['btn']} type="button" onClick={this.handleEditBtnClick}>Edit</button>
                  <button className={styles['btn']} type="button" onClick={this.handleDeleteBtnClick}>Delete</button>
                </div>
              </Fragment>
            )
        }
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(Comment);
