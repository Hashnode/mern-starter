import * as ActionTypes from '../constants/constants';

const initialState = { posts: [], selectedPost: null };

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_POST :
      return {
        posts: [{
          name: action.name,
          title: action.title,
          content: action.content,
          slug: action.slug,
          cuid: action.cuid,
          id: action.id,
        }].concat(state.posts),
        post: state.post };

    case ActionTypes.CHANGE_SELECTED_POST :
      return {
        posts: state.posts,
        post: action.slug,
      };

    case ActionTypes.ADD_POSTS :
      return {
        posts: action.posts,
        post: state.post,
      };

    case ActionTypes.ADD_SELECTED_POST :
      return {
        post: action.post,
        posts: state.posts,
      };

    case ActionTypes.DELETE_POST :
      return {
        posts: state.posts.filter((post) => post.id !== action.post.id),
      };

    default:
      return state;
  }
};

export default postReducer;
