import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { addComment } from '../../CommentActions';


// Import Style
import styles from './CommentCreate.css';

export class CommentCreateA extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }
  changeShowBtn() {
    this.setState({ show: true });
  }
  addComment() {
    this.setState({ show: false });
    const nameRef = this.refs.name;
    const contentRef = this.refs.content;
    if (nameRef.value && contentRef.value && this.props.postId) {
      const comment = { postId: this.props.postId, name: nameRef.value, content: contentRef.value, commentId: Math.random() };
      this.props.addComment(comment);
      nameRef.value = contentRef.value = '';
    }
  }

  render() {
    const cls = `${styles.form} ${(this.state.show ? styles.appear : '')}`;
    const viceVersa = `${styles.form} ${(!this.state.show ? styles.appear : '')}`;
    return (
      <div>
        <div className={viceVersa}>
          <a className={styles['add-post-button']} href="#" onClick={this.changeShowBtn()}><FormattedMessage id="addComment" /></a>
        </div>
        <div className={cls}>
          <div className={styles['form-content']}>
            <h2 className={styles['form-title']}><FormattedMessage id="createComment" /></h2>
            <input placeholder={this.props.messages.authorName} className={styles['form-field']} ref="name" />
            <textarea placeholder={this.props.messages.commentContent} className={styles['form-field']} ref="content" />
            <a className={styles['post-submit-button']} href="#" onClick={this.addComment()}><FormattedMessage id="submit" /></a>
          </div>
        </div>
      </div>
    );
  }
}
CommentCreateA.propTypes = {
  postId: PropTypes.string.isRequired,
  messages: PropTypes.shape({
    authorName: PropTypes.string.isRequired,
    commentContent: PropTypes.string.isRequired,
  }).isRequired,
  addComment: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ messages: state.intl.messages });
const mapDispatchToProps = { addComment };
const CommentCreate = connect(mapStateToProps, mapDispatchToProps)(CommentCreateA);
export default CommentCreate;
