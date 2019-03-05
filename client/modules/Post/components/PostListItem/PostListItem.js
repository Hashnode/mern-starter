import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

import Comp from './newComponent/Comp';

// Import Style
import styles from './PostListItem.css';

class PostListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true,
      click: true,
    };
  }

  addComment = () => {
    this.setState({
      isOpen: !this.state.isOpen,
      click: !this.state.click,

    });
  }

  editState = (isOpen) => {
    this.setState({ isOpen });
  }

  render() {
    const { isOpen, click } = this.state;
    let name;
    isOpen === true ? name = 'Add comment' : name = 'Cencel';

    return (
      <div className={styles['single-post']}>
        <h3 className={styles['post-title']}>
          <Link to={`/posts/${this.props.post.slug}-${this.props.post.cuid}`} >
            {this.props.post.title}
          </Link>
        </h3>
        <p className={styles['author-name']}><FormattedMessage id="by" /> {this.props.post.name}</p>
        <p className={styles['post-desc']}>{this.props.post.content}</p>
        <p className={styles['post-action']}><a href="#" onClick={this.props.onDelete}><FormattedMessage id="deletePost" /></a></p>
        <p className={styles['add-comment']} onClick={this.addComment}>{name}</p>
        <hr className={styles.divider} />
        {<Comp isOpen={isOpen} editState={this.editState} click={click} />}
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
};

export default PostListItem;
