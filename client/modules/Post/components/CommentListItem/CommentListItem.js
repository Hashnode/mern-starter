import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import s from './CommentListItem.css';
import Button from '../../../App/components/Button/Button';
import CommentForm from '../CommentForm/CommentForm';

class CommentListItem extends Component {
  state = {
    isEdit: false,
  };
  handleEditClick = () => this.setState(({ isEdit }) => ({ isEdit: !isEdit }));
  handleEditSubmit = (authorValue, textValue) => {
    this.handleEditClick();
    this.props.onEditComment(authorValue, textValue, this.props.comment.cuid);
  };
  handelDeleteClick = () => this.props.onDeleteComment(this.props.comment.cuid);
  render() {
    const { comment: { text, author, createdAt } } = this.props;
    const { isEdit } = this.state;
    const date = (new Date(createdAt)).toGMTString();
    return (
      <div className={s.comment}>
        {isEdit ? (
          <CommentForm
            comment={this.props.comment}
            onSubmit={this.handleEditSubmit}
            onCancel={this.handleEditClick}
          />
        ) : (
          <React.Fragment>
            <div className={s.text}>
              {text}
            </div>
            <div className={s.footer}>
              <div className={s.actions}>
                <Button color="primary" onClick={this.handleEditClick}>
                  <FormattedMessage id="editComment" />
                </Button>
                <Button onClick={this.handelDeleteClick}>
                  <FormattedMessage id="deleteComment" />
                </Button>
              </div>
              <div className={s.about}>
                <div className={s.author}>
                  <FormattedMessage id="by" /> {author}
                </div>
                <div>
                  {date}
                </div>
              </div>
            </div>
          </React.Fragment>
        )}

      </div>
    );
  }
}

CommentListItem.propTypes = {
  comment: PropTypes.shape({
    author: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }),
  onEditComment: PropTypes.func.isRequired,
  onDeleteComment: PropTypes.func.isRequired,
};

export default CommentListItem;
