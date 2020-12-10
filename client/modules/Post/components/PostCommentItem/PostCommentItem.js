import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import styles from './PostCommentItem.css';

export class PostCommentItem extends PureComponent {
  render() {
    const { name, content, deleteComment, editComment, cuid } = this.props;
    return (
      <div className={styles.root}>
        <div className={styles.header}>
          <p className={styles.name}>{name}</p>
          <div className={styles.headerActions}>
            <p onClick={() => editComment(cuid)}>edit</p>
            <p onClick={() => deleteComment(cuid)}>delete</p>
          </div>
        </div>
        <p className={styles.content}>{content}</p>
      </div>
    );
  }
}

PostCommentItem.propTypes = {
  name: PropTypes.string,
  content: PropTypes.string,
  deleteComment: PropTypes.func,
  editComment: PropTypes.func,
};

PostCommentItem.defaultProps = {
  name: '',
  content: '',
};
