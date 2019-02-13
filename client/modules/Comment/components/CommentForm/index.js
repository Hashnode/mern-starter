import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';
class CommentForm extends PureComponent {
  static propTypes = {
    comment: PropTypes.shape({
      _id: PropTypes.string,
      text: PropTypes.string,
      author: PropTypes.string,
    }),
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func,
    clearStateOnSubmit: PropTypes.bool,
    isUpdate: PropTypes.bool,
  };

  static defaultProps = {
    clearStateOnSubmit: false,
    isUpdate: false,
  };

  state = {
    author: '',
    text: '',
    propsReceived: false,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { comment } = nextProps;
    const { propsReceived } = prevState;

    if (typeof comment !== 'undefined' && !propsReceived) {
      return {
        author: comment.author,
        text: comment.text,
        propsReceived: true,
      };
    }

    return null;
  }

  handleAuthorChange = e => {
    this.setState({
      author: e.target.value,
    });
  }

  handleTextChange = e => {
    this.setState({
      text: e.target.value,
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { author, text } = this.state;
    const { onSubmit, clearStateOnSubmit } = this.props;

    onSubmit(author, text).then(() => {
      if (clearStateOnSubmit) {
        this.setState({
          author: '',
          text: '',
        });
      }
    });
  }

  render() {
    const {
      text,
      author,
    } = this.state;

    const { comment, onCancel, isUpdate } = this.props;

    return (
      <div className={styles['wrapper']}>
        <h2 className={styles['form-title']}>{isUpdate ? 'Edit comment' : 'New comment'}</h2>
        <form className="comment-form" onSubmit={this.handleSubmit}>
          <div className="field-wrapper">
            <label htmlFor="author">Author</label>
            <input className={styles['form-field']} type="text" name="author" value={author} onChange={this.handleAuthorChange} />
          </div>
          <div className="field-wrapper">
            <label htmlFor="text">Comment</label>
            <textarea className={styles['form-field']} type="text" name="text" value={text} onChange={this.handleTextChange} />
          </div>
          <div className="form-actions">
            <button type="submit" className={styles['btn']} disabled={!text || !author}>{isUpdate ? 'Update' : 'Create'}</button>
            {
              comment && <button type="button" className={styles['btn']} onClick={onCancel}>Cancel</button>
            }
          </div>
        </form>
      </div>
    );
  }
}

export default CommentForm;
