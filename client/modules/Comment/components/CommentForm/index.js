import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

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
  };

  static defaultProps = {
    clearStateOnSubmit: false,
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

    const { comment, onCancel } = this.props;

    return (
      <div className="form-wrapper">
        <form className="comment-form" onSubmit={this.handleSubmit}>
          <div className="field-wrapper">
            <label htmlFor="author">Author</label>
            <input type="text" name="author" value={author} onChange={this.handleAuthorChange} />
          </div>
          <div className="field-wrapper">
            <label htmlFor="text">Comment</label>
            <textarea type="text" name="text" value={text} onChange={this.handleTextChange} />
          </div>
          <div className="form-actions">
            <button type="submit" disabled={!text || !author}>Save</button>
            {
              comment && <button type="button" onClick={onCancel}>Cancel</button>
            }
          </div>
        </form>
      </div>
    );
  }
}

export default CommentForm;
