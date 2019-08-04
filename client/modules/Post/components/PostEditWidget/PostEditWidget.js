/* eslint-disable react/prop-types */
/* eslint-disable react/no-did-mount-set-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

// Import Style
import style from './PostEditWidget.module.css';

export class PostEditWidget extends Component {
  state = {
    name: null,
    title: null,
    content: null,
  };

  componentDidMount() {
    this.setState({
      name: this.props.name.current.innerText,
      title: this.props.title.current.props.children,
      content: this.props.content.current.textContent,
    });
  }

  componentDidUpdate() {
    const { content } = this.state;
    this.refs.editContent.value = content;
  }

  editPost = e => {
    e.preventDefault();

    const nameRef = this.refs.editName;
    const titleRef = this.refs.editTitle;
    const contentRef = this.refs.editContent;

    if (nameRef.value && titleRef.value && contentRef.value) {
      this.props.onEdit(this.props.id, {
        name: nameRef.value,
        title: titleRef.value,
        content: contentRef.value,
      });
      nameRef.value = titleRef.value = contentRef.value = '';
      this.props.toggle();
    }
  };

  render() {
    const cls = `${style.form} ${this.props.showEditPost ? style.appear : ''}`;
    const { name, title } = this.state;
    return (
      <div className={cls}>
        <div className={style.formContent}>
          <h2 className={style.formTitle}>
            <FormattedMessage id="editPost" />
          </h2>
          <input
            placeholder={this.props.intl.messages.authorName}
            className={style.formField}
            ref="editName"
            defaultValue={name}
          />
          <input
            placeholder={this.props.intl.messages.postTitle}
            className={style.formField}
            ref="editTitle"
            defaultValue={title}
          />
          <textarea
            placeholder={this.props.intl.messages.postContent}
            className={style.formField}
            ref="editContent"
          />
          <a className={style.postSubmitButton} href="#" onClick={this.editPost}>
            <FormattedMessage id="submit" />
          </a>
        </div>
      </div>
    );
  }
}

PostEditWidget.propTypes = {
  id: PropTypes.string,
  onEdit: PropTypes.func.isRequired,
  showEditPost: PropTypes.bool.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(PostEditWidget);
