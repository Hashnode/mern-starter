import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './CommentListItem.css';

// Import Comment
import Button from '../../../../components/Button/Button';
import CommentWidget from '../CommentWidget/CommentWidget';

class CommentListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
    };
  }

  toogleEdit = () => {
    this.setState(prevState => ({ isEdit: !prevState.isEdit }));
  }

  render() {
    return (
      <div className={styles['single-comment']}>
        <p className={styles['author-name']}><FormattedMessage id="by" /> {this.props.comment.username}</p>
        <p className={styles['comment-desc']}>{this.props.comment.content}</p>
        <p className={styles['comment-action']}>
          <Button className={styles['comment-edit-button']} onClick={this.toogleEdit}><FormattedMessage id="editComment" /></Button>
          <Button className={styles['comment-delete-button']} onClick={this.props.onDelete}><FormattedMessage id="deleteComment" /></Button>
        </p>
        <hr className={styles.divider} />
        <CommentWidget
          isVisible={this.state.isEdit}
          username={this.props.comment.username}
          content={this.props.comment.content}
          submit={(username, content) => {
            this.props.onEdit(username, content);
            this.toogleEdit();
          }}
          cancel={this.toogleEdit}
        />
      </div>
    );
  }
}

CommentListItem.propTypes = {
  comment: PropTypes.shape({
    username: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CommentListItem;
