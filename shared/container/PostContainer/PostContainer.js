/* eslint no-unused-vars:0 */
import React, { PropTypes } from 'react';
import PostListView from '../PostListView/PostListView';
import PostCreateView from '../../components/PostCreateView/PostCreateView';
import { connect } from 'react-redux';
import * as Actions from '../../redux/actions/actions';

function PostContainer(props, context) {
	return (
		<div>
			<PostCreateView addPost={function add(name, title, content) {
	          props.dispatch(Actions.addPostRequest({ name, title, content }));
	        }}
	        />
	        <PostListView posts={props.posts}/>
		</div>
	);
}

PostContainer.need = [function () { return Actions.fetchPosts(); }];

function mapStateToProps(store) {
  return {
    posts: store.posts,
  };
}

export default connect(mapStateToProps)(PostContainer);