import React, { PropTypes, Component } from 'react';
import PostListView from '../../components/PostList';
import PostCreateView from '../../components/PostCreateWidget/PostCreateWidget';
import { connect } from 'react-redux';
import { addPostRequest, fetchPosts, addSelectedPost, deletePostRequest } from '../../PostActions';
import { toggleAddPost } from '../../../App/AppActions';

class PostListPage extends Component {
  componentDidMount() {
    if (this.props.posts.length === 0) {
      this.props.dispatch(fetchPosts());
    }
  }

  handleShowPost = post => {
    this.props.dispatch(addSelectedPost(post));
  };

  handleDeletePost = post => {
    if (confirm('Do you want to delete this post')) { // eslint-disable-line
      this.props.dispatch(deletePostRequest(post));
    }
  };

  handleAddPost = (name, title, content) => {
    this.props.dispatch(toggleAddPost());
    this.props.dispatch(addPostRequest({ name, title, content }));
  };

  render() {
    return (
      <div>
        <PostCreateView addPost={this.handleAddPost} showAddPost={this.props.showAddPost} />
        <PostListView handleShowPost={this.handleShowPost} handleDeletePost={this.handleDeletePost} posts={this.props.posts} />
      </div>
    );
  }
}

PostListPage.need = [() => { return fetchPosts(); }];

PostListPage.contextTypes = {
  router: React.PropTypes.object,
};

function mapStateToProps(store) {
  return {
    showAddPost: store.app.showAddPost,
    posts: store.posts.posts,
  };
}

PostListPage.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  })).isRequired,
  showAddPost: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(PostListPage);
