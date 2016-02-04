import * as ActionTypes from '../constants/constants';

const initialState = { posts: [], selectedPost: null };

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_POST :
      return {
        posts: state.posts.concat({
          name: action.name,
          title: action.title,
          content: action.content,
        }),
        selectedPost: state.selectedPost };

    case ActionTypes.CHANGE_SELECTED_POST :
      return {
        posts: state.posts,
        selectedPost: action.title,
      };

    case ActionTypes.ADD_POSTS :
      return {
        posts: action.posts,
        selectedPost: state.selectedPost,
      };

    default:
      return state;
  }
};

export default postReducer;
