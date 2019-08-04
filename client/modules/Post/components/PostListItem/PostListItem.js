import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

import PostEditWidget from '../../components/PostEditWidget/PostEditWidget';

// Import Style
import styles from './PostListItem.css';

export default class PostListItem extends Component {
  state = {
    showEditPost: false,
  };

  titleRef = createRef();
  nameRef = createRef();
  contentRef = createRef();

  toggleEdit = () => {
    // e.preventDefault();
    const { showEditPost } = this.state;
    this.setState({ showEditPost: !showEditPost });
  };

  render() {
    const { showEditPost } = this.state;
    return (
      <div className={styles['single-post']}>
        <h3 className={styles['post-title']} ref="title">
          <Link to={`/posts/${this.props.post.slug}-${this.props.post.cuid}`} ref={this.titleRef}>
            {this.props.post.title}
          </Link>
        </h3>
        <FormattedMessage id="by" />
        <span className={styles['author-name']} ref={this.nameRef}>
          {this.props.post.name}
        </span>
        <p className={styles['post-desc']} ref={this.contentRef}>
          {this.props.post.content}
        </p>
        <p className={styles['post-action']}>
          <a href="#" onClick={this.props.onDelete}>
            <FormattedMessage id="deletePost" />
          </a>
        </p>
        <p className={styles['post-action']}>
          <a href="#" onClick={this.toggleEdit}>
            <FormattedMessage id="editPost" />
          </a>
        </p>
        <PostEditWidget
          id={this.props.post.cuid}
          showEditPost={showEditPost}
          onEdit={this.props.onEdit}
          name={this.nameRef}
          title={this.titleRef}
          content={this.contentRef}
          toggle={this.toggleEdit}
        />
        <hr className={styles.divider} />
      </div>
    );
  }
}

PostListItem.propTypes = {
  post: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};
