/* eslint no-unused-vars:0 */
import React, { PropTypes } from 'react';
import PostListItem from '../../components/PostListItem/PostListItem';
import { connect } from 'react-redux';
import * as Actions from '../../redux/actions/actions';

function PostListView(props, context) {
  return <div>
          {props.posts.map((post, i, arr) =>
            (<PostListItem post={post} key={i}
              onClick={function handleClick(title) {
                 console.log('Clicked!')
                 props.dispatch(Actions.changeSelectedPost(title));
               }}
         />))} </div>;
}

PostListView.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(store) {
  return {
    posts: store.posts,
  };
}

export default connect(mapStateToProps)(PostListView);
