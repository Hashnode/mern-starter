/* eslint no-unused-vars:0 */
import React, { PropTypes, Component } from 'react';
import PostListView from '../PostListView/PostListView';
import PostCreateView from '../../components/PostCreateView/PostCreateView';
import { connect } from 'react-redux';
import * as Actions from '../../redux/actions/actions';

class PostContainer extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showAddPost: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.add = this.add.bind(this);
  }

  handleClick() {
    this.setState({
      showAddPost: true,
    });
  }

  add(name, title, content) {
    this.props.dispatch(Actions.addPostRequest({ name, title, content }));
  }

  render() {
    return (
        <div>
          <div className="header">
            <div className="header-content">
              <a className="add-post-button" href="#" onClick={this.handleClick}>Add Post</a>
              <h1 className="site-title"><a href="/">MERN Starter Blog</a></h1>
            </div>
          </div>
          <div className="container">
            <PostCreateView addPost={this.add}
              showAddPost={this.state.showAddPost}
            />
          <PostListView posts={this.props.posts}/>
          </div>
        </div>
      );
  }
}

PostContainer.need = [function () { return Actions.fetchPosts(); }];

function mapStateToProps(store) {
  return {
    posts: store.posts,
  };
}

PostContainer.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(PostContainer);
