import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

// Import Style
import styles from './PostCreateWidget.css';

export class PostCreateWidget extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      title: '',
      content: '',
    };
  }

  handleInputChange = (e) => this.setState({ [e.target.name]: e.target.value });

  addPost = () => {
    const { name, title, content } = this.state;
    if (name && title && content) {
      this.props.addPost(name, title, content);
      this.setState({ name: '', title: '', content: '' });
    }
  };

  render() {
    const { intl } = this.context;
    const cls = `${styles.form} ${(this.props.showAddPost ? styles.appear : '')}`;
    return (
      <div className={cls}>
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}><FormattedMessage id="createNewPost" /></h2>
          <input id="name" name="name" placeholder={intl.messages.authorName} className={styles['form-field']} onChange={this.handleInputChange} />
          <input id="title" name="title" placeholder={intl.messages.postTitle} className={styles['form-field']} onChange={this.handleInputChange} />
          <textarea id="content" name="content" placeholder={intl.messages.postContent} className={styles['form-field']} onChange={this.handleInputChange} />
          <a className={styles['post-submit-button']} href="#" onClick={this.addPost}><FormattedMessage id="submit" /></a>
        </div>
      </div>
    );
  }
}

PostCreateWidget.contextTypes = {
  intl: intlShape.isRequired,
};

PostCreateWidget.propTypes = {
  addPost: PropTypes.func.isRequired,
  showAddPost: PropTypes.bool.isRequired,
};

export default injectIntl(PostCreateWidget);
