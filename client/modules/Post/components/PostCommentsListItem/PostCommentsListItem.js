import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Import Style
import styles from './PostCommentsListItem.css';

// Import Actions
import { updateCommentRequest, deleteCommentRequest } from '../../CommentActions';

class PostCommentsListItem extends Component {
  
  state = {
    changing: false,
    deleting: false
  }

  handleToChangeBtnClick = () => {
    this.setState({ changing: true, changingText: this.props.text })
  }

  handleToDeleteBtnClick = () => {
    this.setState({ deleting: true })
  }

  handleResetBtnClick = () => {
    this.resetState()
  }

  handleSaveChanges = () => {
    this.props.dispatch(updateCommentRequest(this.props.comment_id, this.state.changingText))
    this.resetState()
  }

  handleDelete = () => {
    this.props.dispatch(deleteCommentRequest(this.props.comment_id))
    this.resetState()
  }

  resetState = () => {
    this.setState({ changing: false, deleting: false })
  }

  handleChangeTextComment = (e) => {
    this.setState({ changingText: e.target.value })
  }

  render() {
    const props = this.props;
    const { changing, changingText, deleting } = this.state;

    return (
      <div className={styles['comment-block']}>

        <p className={styles.author}>{props.author}</p>
        {changing
          ? <textarea 
              className={styles['changing-text-input']} 
              rows={3} 
              cols={50} 
              value={changingText} 
              onChange={this.handleChangeTextComment}
            ></textarea>
          : <p>{props.text}</p>
        }

        <div className={styles['admin-panel']}>
          
          {!changing && !deleting && <div>
            <p className={styles['admin-button']} onClick={this.handleToChangeBtnClick}>Change</p>,
            <p className={styles['admin-button']} onClick={this.handleToDeleteBtnClick}>Delete</p>
          </div>}

          {changing && <div>
            <p className={styles['admin-question']}>Save changes ?</p>,
            <p className={styles['admin-button']} onClick={this.handleSaveChanges}>Save</p>,
            <p className={styles['admin-button']} onClick={this.handleResetBtnClick}>Cancel</p>
          </div>}

          {deleting && <div>
            <p className={styles['admin-question']}>Exactly delete ?</p>,
            <p className={styles['admin-button']} onClick={this.handleDelete}>Delete</p>,
            <p className={styles['admin-button']} onClick={this.handleResetBtnClick}>Cancel</p>
          </div>}
        
        </div>
      </div>
    );
  }
}

PostCommentsListItem.propTypes = {
  comment_id: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default connect(null)(PostCommentsListItem);